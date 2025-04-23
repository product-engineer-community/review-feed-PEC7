import { NextRequest, NextResponse } from "next/server";
import { fetchNaver } from "@/entities/review/api/crawl-naver";
import { fetchKakao } from "@/entities/review/api/crawl-kakao";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const naverId = searchParams.get("naver");
  const kakaoId = searchParams.get("kakao");

  if (!naverId && !kakaoId) {
    return NextResponse.json(
      { error: "No place IDs provided" },
      { status: 400 },
    );
  }

  try {
    const results: {
      naverReviews: any[];
      kakaoReviews: any[];
      kakaoPlaceInfo?: any;
    } = {
      naverReviews: [],
      kakaoReviews: [],
    };

    const naverPromise = naverId
      ? fetchNaver(naverId)
          .then((data) => {
            results.naverReviews = data;
          })
          .catch(() => {})
      : Promise.resolve();

    const kakaoPromise = kakaoId
      ? fetchKakao(kakaoId)
          .then((data) => {
            results.kakaoReviews = data.reviews;
            results.kakaoPlaceInfo = data.placeInfo;
          })
          .catch(() => {})
      : Promise.resolve();

    // 병렬로 실행하지만 default가 naver라면 최소 naver 완료 후 응답
    await Promise.all([naverPromise, kakaoPromise]);

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Fetch failed" },
      { status: 500 },
    );
  }
}
