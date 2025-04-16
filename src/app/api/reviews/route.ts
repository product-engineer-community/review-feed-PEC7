import { NextRequest, NextResponse } from "next/server";
import { fetchNaverReviews } from "@/entities/review/api/crawl-naver";
import { fetchKakaoReviews } from "@/entities/review/api/crawl-kakao";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const naverId = searchParams.get("naver");
  const kakaoId = searchParams.get("kakao");

  if (!naverId && !kakaoId) {
    return NextResponse.json({ error: "No place IDs provided" }, { status: 400 });
  }

  try {
    const [naverReviews, kakaoReviews] = await Promise.all([
      naverId ? fetchNaverReviews(naverId).catch(() => []) : [],
      kakaoId ? fetchKakaoReviews(kakaoId).catch(() => []) : [],
    ]);

    return NextResponse.json({ naverReviews, kakaoReviews });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Fetch failed" },
      { status: 500 }
    );
  }
}
