import { NaverReview, KakaoReview } from "@/entities/review/model/types";
import {
  KakaoReviewCard,
  NaverReviewCard,
  ErrorState,
  EmptyState,
  LoadingState,
} from "@/entities/review/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

interface ReviewDetailContentProps {
  naverReviews: NaverReview[];
  kakaoReviews: KakaoReview[];
  naverError?: Error | null;
  kakaoError?: Error | null;
  isLoading?: boolean;
}

// Generate a unique key for Naver review
function getNaverReviewKey(review: NaverReview): string {
  return `naver-${review.nickname}-${review.visitDate}-${review.body.slice(0, 50)}`;
}

// Generate a unique key for Kakao review
function getKakaoReviewKey(review: KakaoReview): string {
  return `kakao-${review.nickname}-${review.reviewDate}-${review.body.slice(0, 50)}`;
}

export function ReviewDetailContent({
  naverReviews,
  kakaoReviews,
  naverError,
  kakaoError,
  isLoading = false,
}: ReviewDetailContentProps) {
  // Both sources have errors
  if (naverError && kakaoError) {
    return (
      <div className="space-y-8">
        <ErrorState title="네이버 리뷰 오류" message={naverError.message} />
        <ErrorState title="카카오 리뷰 오류" message={kakaoError.message} />
      </div>
    );
  }

  // Both sources are empty
  if (
    naverReviews.length === 0 &&
    kakaoReviews.length === 0 &&
    !naverError &&
    !kakaoError
  ) {
    return (
      <EmptyState
        title="리뷰가 없습니다"
        message="이 장소에 대한 리뷰가 아직 없습니다."
      />
    );
  }

  // Success state - render reviews with tabs
  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="naver" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="naver">네이버 리뷰</TabsTrigger>
            <TabsTrigger value="kakao">카카오 리뷰</TabsTrigger>
          </TabsList>

          <TabsContent value="naver" className="mt-6">
            {isLoading ? (
              <LoadingState platform="naver" />
            ) : naverError ? (
              <ErrorState
                title="네이버 리뷰 오류"
                message={naverError.message}
              />
            ) : naverReviews.length === 0 ? (
              <EmptyState
                title="네이버 리뷰가 없습니다"
                message="이 장소에 대한 네이버 리뷰가 아직 없습니다."
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {naverReviews.map((review) => (
                  <NaverReviewCard
                    key={getNaverReviewKey(review)}
                    review={review}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="kakao" className="mt-6">
            {isLoading ? (
              <LoadingState platform="kakao" />
            ) : kakaoError ? (
              <ErrorState
                title="카카오 리뷰 오류"
                message={kakaoError.message}
              />
            ) : kakaoReviews.length === 0 ? (
              <EmptyState
                title="카카오 리뷰가 없습니다"
                message="이 장소에 대한 카카오 리뷰가 아직 없습니다."
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {kakaoReviews.map((review) => (
                  <KakaoReviewCard
                    key={getKakaoReviewKey(review)}
                    review={review}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
