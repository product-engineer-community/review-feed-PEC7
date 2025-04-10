"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import {
  checkLocationPermission,
  getCurrentLocation,
} from "@/entities/location/api/geolocation";
import {
  LocationError,
  LocationState,
  PermissionState,
} from "@/entities/location/model/types";

interface LocationContextType {
  locationState: LocationState;
  permissionState: PermissionState;
  refreshLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

interface LocationProviderProps {
  children: React.ReactNode;
  watchInterval?: number; // 위치 갱신 주기 (ms)
}

export const LocationProvider = ({
  children,
  watchInterval = 5 * 60 * 1000, // 기본값 5분
}: LocationProviderProps): React.ReactNode => {
  const [locationState, setLocationState] = useState<LocationState>({
    status: "idle",
    data: null,
    error: null,
  });
  const [permissionState, setPermissionState] =
    useState<PermissionState>("prompt");

  const updateLocation = async () => {
    setLocationState((prev) => ({ ...prev, status: "loading" }));

    try {
      const location = await getCurrentLocation();
      setLocationState({
        status: "success",
        data: location,
        error: null,
      });
    } catch (error) {
      setLocationState({
        status: "error",
        data: null,
        error: error as LocationError,
      });
    }
  };

  const refreshLocation = async () => {
    const permission = await checkLocationPermission();
    setPermissionState(permission);

    if (permission === "granted") {
      await updateLocation();
    } else if (permission === "prompt") {
      // 권한이 prompt 상태일 때 즉시 위치 정보를 요청하여 권한 팝업을 띄웁니다
      try {
        await getCurrentLocation();
        // 권한이 허용되면 위치 정보를 다시 가져옵니다
        await refreshLocation();
      } catch (error) {
        // 권한이 거부되면 에러 상태를 설정합니다
        setLocationState({
          status: "error",
          data: null,
          error: error as LocationError,
        });
        // 권한 상태를 다시 확인합니다
        const newPermission = await checkLocationPermission();
        setPermissionState(newPermission);
      }
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트되면 즉시 위치 정보를 요청합니다
    refreshLocation();

    // 주기적으로 위치 정보 갱신
    if (watchInterval > 0) {
      const intervalId = setInterval(refreshLocation, watchInterval);
      return () => clearInterval(intervalId);
    }
  }, [watchInterval]);

  const value = {
    locationState,
    permissionState,
    refreshLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
