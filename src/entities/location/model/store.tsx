"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  checkLocationPermission,
  getCurrentLocation,
} from "@/entities/location/api/geolocation";
import { getRegionInfo } from "@/entities/location/api/kakao";

import type {
  LocationPermissionState,
  LocationState,
  RegionState,
} from "./types";

// 기본 위치 정보 (서울시 종로구 종로1가)
const DEFAULT_LOCATION = {
  latitude: 37.570705,
  longitude: 126.992369,
  timestamp: Date.now(),
};

// 기본 행정구역 정보
const DEFAULT_REGION = {
  city: "서울특별시",
  district: "종로구",
  neighborhood: "종로1가",
};

interface LocationContextType {
  locationState: LocationState;
  permissionState: LocationPermissionState;
  regionState: RegionState;
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
}: LocationProviderProps) => {
  const [locationState, setLocationState] = useState<LocationState>({
    status: "idle",
    data: null,
    error: null,
  });

  const [permissionState, setPermissionState] =
    useState<LocationPermissionState>("prompt");

  const [regionState, setRegionState] = useState<RegionState>({
    status: "idle",
    data: null,
    error: null,
  });

  const updateLocation = useCallback(async () => {
    try {
      setLocationState((prev) => ({
        ...prev,
        status: "loading",
        error: null,
      }));
      setRegionState((prev) => ({
        ...prev,
        status: "loading",
        error: null,
      }));

      const location = await getCurrentLocation();
      setLocationState({
        status: "success",
        data: location,
        error: null,
      });

      try {
        const region = await getRegionInfo(
          location.latitude,
          location.longitude,
        );
        setRegionState({
          status: "success",
          data: region,
          error: null,
        });
      } catch (error) {
        console.warn("Failed to get region info, using default region:", error);
        setRegionState({
          status: "success",
          data: DEFAULT_REGION,
          error: null,
        });
      }
    } catch (error) {
      console.warn("Failed to get location, using default location:", error);
      setLocationState({
        status: "success",
        data: DEFAULT_LOCATION,
        error: null,
      });
      setRegionState({
        status: "success",
        data: DEFAULT_REGION,
        error: null,
      });
    }
  }, []);

  useEffect(() => {
    const checkPermission = async () => {
      const permission = await checkLocationPermission();
      setPermissionState(permission);

      if (permission === "granted") {
        await updateLocation();
      } else {
        // 권한이 거부되거나 아직 요청되지 않은 경우 기본값 사용
        setLocationState({
          status: "success",
          data: DEFAULT_LOCATION,
          error: null,
        });
        setRegionState({
          status: "success",
          data: DEFAULT_REGION,
          error: null,
        });
      }
    };

    checkPermission();

    if (watchInterval && watchInterval > 0) {
      const intervalId = setInterval(updateLocation, watchInterval);
      return () => clearInterval(intervalId);
    }
  }, [watchInterval, updateLocation]);

  const value = {
    locationState,
    permissionState,
    regionState,
    refreshLocation: updateLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
