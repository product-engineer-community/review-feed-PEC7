/**
 * 위치 정보를 나타내는 인터페이스
 */
export type Location = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

/**
 * 위치 정보 상태를 나타내는 타입
 */
export type LocationState = {
  status: "idle" | "loading" | "success" | "error";
  data: Location | null;
  error: Error | null;
};

/**
 * 위치 정보 에러 타입
 */
export class LocationError extends Error {
  constructor(
    public code: number,
    message: string,
  ) {
    super(message);
    this.name = "LocationError";
  }
}

/**
 * 위치 정보 권한 상태
 */
export type LocationPermissionState = "prompt" | "granted" | "denied";

export type RegionInfo = {
  city: string; // 시/도 (예: 서울특별시)
  district: string; // 구/군 (예: 강남구)
  neighborhood: string; // 동/읍/면 (예: 역삼동)
};

export type RegionState = {
  status: "idle" | "loading" | "success" | "error";
  data: RegionInfo | null;
  error: Error | null;
};
