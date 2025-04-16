import { fetchReviews } from "@/entities/review/api/fetch-reviews";
import { ReviewDetailContent, ErrorState } from "@/entities/review/ui";
import { NaverReview, KakaoReview } from "@/entities/review/model/types";
import { Suspense } from "react";
import FeedDetailLoading from "./loading";

interface FeedDetailPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FeedDetailPage({
  searchParams,
}: FeedDetailPageProps) {
  const params = await searchParams;

  const naverId = typeof params.naver === "string" ? params.naver : undefined;
  const kakaoId = typeof params.kakao === "string" ? params.kakao : undefined;

  // No IDs provided
  if (!naverId && !kakaoId) {
    return (
      <ErrorState
        title="장소 ID가 없습니다"
        message="네이버 또는 카카오 장소 ID가 필요합니다."
      />
    );
  }

  // Initialize variables for reviews and errors
  let naverReviews: NaverReview[] = [];
  let kakaoReviews: KakaoReview[] = [];
  let naverError: Error | null = null;
  let kakaoError: Error | null = null;

  // Fetch reviews in parallel
  const [naverResult, kakaoResult] = await Promise.allSettled([
    naverId
      ? fetchReviews(naverId, undefined)
      : Promise.resolve({ naverReviews: [] }),
    kakaoId
      ? fetchReviews(undefined, kakaoId)
      : Promise.resolve({ kakaoReviews: [] }),
  ]);

  // Handle Naver reviews result
  if (naverResult.status === "fulfilled") {
    naverReviews = naverResult.value.naverReviews;
  } else {
    naverError =
      naverResult.reason instanceof Error
        ? naverResult.reason
        : new Error("네이버 리뷰를 불러오는 중 오류가 발생했습니다.");
  }

  // Handle Kakao reviews result
  if (kakaoResult.status === "fulfilled") {
    kakaoReviews = kakaoResult.value.kakaoReviews;
  } else {
    kakaoError =
      kakaoResult.reason instanceof Error
        ? kakaoResult.reason
        : new Error("카카오 리뷰를 불러오는 중 오류가 발생했습니다.");
  }

  // Render content with appropriate state handling
  return (
    <Suspense fallback={<FeedDetailLoading />}>
      <ReviewDetailContent
        naverReviews={naverReviews}
        kakaoReviews={kakaoReviews}
        naverError={naverError}
        kakaoError={kakaoError}
      />
    </Suspense>
  );
}
