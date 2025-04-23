import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LocationProvider, useLocation } from "@/entities/location";
import * as geolocation from "@/entities/location/api/geolocation";

// 테스트용 위치 데이터
const mockLocation = {
  latitude: 37.5326,
  longitude: 127.0246,
  timestamp: Date.now(),
};

describe("Location Entity", () => {
  it("초기 상태가 올바르게 설정되어야 함", async () => {
    vi.spyOn(geolocation, "checkLocationPermission").mockResolvedValue(
      "prompt",
    );

    const { result } = renderHook(() => useLocation(), {
      wrapper: LocationProvider,
    });

    expect(result.current.locationState.status).toBe("idle");
    expect(result.current.locationState.data).toBeNull();
    expect(result.current.locationState.error).toBeNull();

    await waitFor(() => {
      expect(result.current.permissionState).toBe("prompt");
    });
  });

  it("위치 정보 권한이 허용되면 위치를 가져와야 함", async () => {
    vi.spyOn(geolocation, "checkLocationPermission").mockResolvedValue(
      "granted",
    );
    vi.spyOn(geolocation, "getCurrentLocation").mockResolvedValue(mockLocation);

    const { result } = renderHook(() => useLocation(), {
      wrapper: LocationProvider,
    });

    await waitFor(() => {
      expect(result.current.permissionState).toBe("granted");
    });

    await waitFor(() => {
      expect(result.current.locationState.status).toBe("success");
      expect(result.current.locationState.data).toEqual(mockLocation);
    });
  });

  it("위치 정보 권한이 거부되면 위치 정보를 가져오지 않아야 함", async () => {
    vi.spyOn(geolocation, "checkLocationPermission").mockResolvedValue(
      "denied",
    );
    const getCurrentLocationSpy = vi.spyOn(geolocation, "getCurrentLocation");

    const { result } = renderHook(() => useLocation(), {
      wrapper: LocationProvider,
    });

    await waitFor(() => {
      expect(result.current.permissionState).toBe("denied");
      expect(getCurrentLocationSpy).not.toHaveBeenCalled();
    });
  });

  it("refreshLocation이 호출되면 위치 정보를 갱신해야 함", async () => {
    vi.spyOn(geolocation, "checkLocationPermission").mockResolvedValue(
      "granted",
    );
    vi.spyOn(geolocation, "getCurrentLocation").mockResolvedValue(mockLocation);

    const { result } = renderHook(() => useLocation(), {
      wrapper: LocationProvider,
    });

    await waitFor(() => {
      expect(result.current.permissionState).toBe("granted");
    });

    await act(async () => {
      await result.current.refreshLocation();
    });

    expect(result.current.locationState.status).toBe("success");
    expect(result.current.locationState.data).toEqual(mockLocation);
  });

  it("위치 정보 가져오기 실패 시 에러 상태를 설정해야 함", async () => {
    const errorMessage = "Failed to get location";
    vi.spyOn(geolocation, "checkLocationPermission").mockResolvedValue(
      "granted",
    );
    vi.spyOn(geolocation, "getCurrentLocation").mockRejectedValue(
      new Error(errorMessage),
    );

    const { result } = renderHook(() => useLocation(), {
      wrapper: LocationProvider,
    });

    await waitFor(() => {
      expect(result.current.locationState.status).toBe("error");
      expect(result.current.locationState.error?.message).toBe(errorMessage);
    });
  });
});
