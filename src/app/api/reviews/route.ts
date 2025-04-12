import { NextRequest, NextResponse } from "next/server";
import { fetchNaverReviews } from "@/entities/review/api/crawl-naver";
import { fetchKakaoReviews } from "@/entities/review/api/crawl-kakao";

export const runtime = "nodejs"; // 명시적으로 Node.js 런타임 사용

export async function GET(request: NextRequest) {
  console.log("API Route: Starting request processing");

  const searchParams = request.nextUrl.searchParams;
  const naverId = searchParams.get("naver");
  const kakaoId = searchParams.get("kakao");

  console.log("API Route: Received params", { naverId, kakaoId });

  if (!naverId && !kakaoId) {
    console.log("API Route: No place IDs provided");
    return NextResponse.json(
      { error: "No place IDs provided" },
      { status: 400 },
    );
  }

  try {
    console.log("API Route: Starting to fetch reviews");

    const [naverReviews, kakaoReviews] = await Promise.all([
      naverId
        ? fetchNaverReviews(naverId).catch((error) => {
            console.error("API Route: Error fetching Naver reviews:", error);
            return [];
          })
        : Promise.resolve([]),
      kakaoId
        ? fetchKakaoReviews(kakaoId).catch((error) => {
            console.error("API Route: Error fetching Kakao reviews:", error);
            return [];
          })
        : Promise.resolve([]),
    ]);

    console.log("API Route: Successfully fetched reviews", {
      naverReviewsCount: naverReviews.length,
      kakaoReviewsCount: kakaoReviews.length,
    });

    return NextResponse.json({
      naverReviews,
      kakaoReviews,
    });
  } catch (error) {
    console.error("API Route: Error in main try-catch:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch reviews",
      },
      { status: 500 },
    );
  }
}
