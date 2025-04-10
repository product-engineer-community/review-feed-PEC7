import {
  Location,
  LocationError,
  PermissionState,
} from "@/entities/location/model/types";

/**
 * Geolocation API 옵션
 */
const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

/**
 * 브라우저의 위치 정보 권한 상태를 확인합니다.
 */
export const checkLocationPermission = async (): Promise<PermissionState> => {
  if (!("permissions" in navigator)) return "unsupported";

  try {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });
    return permission.state as PermissionState;
  } catch {
    return "unsupported";
  }
};

/**
 * 현재 위치를 가져옵니다.
 */
export const getCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(
        new LocationError(0, "Geolocation is not supported by this browser."),
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        reject(new LocationError(error.code, error.message));
      },
      GEOLOCATION_OPTIONS,
    );
  });
};

/**
 * 위치 변경을 감지하고 콜백을 실행합니다.
 */
export const watchLocation = (
  onSuccess: (location: Location) => void,
  onError: (error: LocationError) => void,
): number => {
  if (!("geolocation" in navigator)) {
    onError(
      new LocationError(0, "Geolocation is not supported by this browser."),
    );
    return 0;
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
      });
    },
    (error) => {
      onError(new LocationError(error.code, error.message));
    },
    GEOLOCATION_OPTIONS,
  );
};

/**
 * 위치 감지를 중지합니다.
 */
export const clearLocationWatch = (watchId: number): void => {
  navigator.geolocation.clearWatch(watchId);
};
