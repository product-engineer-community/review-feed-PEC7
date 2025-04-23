"use server";

import {
  NaverReview,
  KakaoReview,
  KakaoPlaceInfo,
} from "@/entities/review/model/types";

export async function fetchReviews(
  naverId?: string,
  kakaoId?: string,
): Promise<{
  naverReviews: NaverReview[];
  kakaoReviews: KakaoReview[];
  kakaoPlaceInfo?: KakaoPlaceInfo;
}> {
  const params = new URLSearchParams();
  if (naverId) params.append("naver", naverId);
  if (kakaoId) params.append("kakao", kakaoId);

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/reviews?${params.toString()}`, {
    method: "GET",
    next: { revalidate: 3600 },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("리뷰 데이터를 불러오지 못했습니다.");
  }

  return response.json();
}
