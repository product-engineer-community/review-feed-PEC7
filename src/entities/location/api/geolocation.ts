import {
  Location,
  LocationError,
  LocationPermissionState,
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
export const checkLocationPermission =
  async (): Promise<LocationPermissionState> => {
    if (!("permissions" in navigator)) return "prompt";

    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });
      return permission.state as LocationPermissionState;
    } catch {
      return "prompt";
    }
  };

/**
 * 현재 위치를 콜백 방식으로 가져옵니다.
 */
export const getCurrentLocationWithCallback = (
  onSuccess: (location: Location) => void,
  onError: (error: LocationError) => void,
): void => {
  if (!("geolocation" in navigator)) {
    onError(
      new LocationError(0, "Geolocation is not supported by this browser."),
    );
    return;
  }

  navigator.geolocation.getCurrentPosition(
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
 * 현재 위치를 Promise 방식으로 가져옵니다.
 */
export const getCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    getCurrentLocationWithCallback(
      (location) => resolve(location),
      (error) => reject(error),
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
