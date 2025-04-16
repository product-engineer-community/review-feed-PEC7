import { NaverReview, KakaoReview } from "@/entities/review/model/types";
import { ReviewItem } from "@/entities/review/ui";
import { ErrorState } from "@/shared/ui/error-state";
import { EmptyState } from "@/shared/ui/empty-state";
import { LoadingState } from "@/shared/ui/loading-state";

interface FeedDetailContentProps {
  naverReviews: NaverReview[];
  kakaoReviews: KakaoReview[];
  naverError?: Error | null;
  kakaoError?: Error | null;
  isLoading?: boolean;
}

export function FeedDetailContent({
  naverReviews,
  kakaoReviews,
  naverError,
  kakaoError,
  isLoading = false,
}: FeedDetailContentProps) {
  // Loading state
  if (isLoading) {
    return (
      <LoadingState
        title="리뷰 불러오는 중"
        message="네이버와 카카오 리뷰를 불러오는 중입니다..."
      />
    );
  }

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

  // Success state - render reviews with individual error/empty states
  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Naver Reviews Section */}
        {naverError ? (
          <section className="mb-8">
            <ErrorState title="네이버 리뷰 오류" message={naverError.message} />
          </section>
        ) : naverReviews.length === 0 ? (
          <section className="mb-8">
            <EmptyState
              title="네이버 리뷰가 없습니다"
              message="이 장소에 대한 네이버 리뷰가 아직 없습니다."
            />
          </section>
        ) : (
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">네이버 리뷰</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {naverReviews.map((review, index) => (
                <ReviewItem
                  key={`naver-${index}`}
                  naverReview={review}
                  kakaoReview={null}
                />
              ))}
            </div>
          </section>
        )}

        {/* Kakao Reviews Section */}
        {kakaoError ? (
          <section>
            <ErrorState title="카카오 리뷰 오류" message={kakaoError.message} />
          </section>
        ) : kakaoReviews.length === 0 ? (
          <section>
            <EmptyState
              title="카카오 리뷰가 없습니다"
              message="이 장소에 대한 카카오 리뷰가 아직 없습니다."
            />
          </section>
        ) : (
          <section>
            <h2 className="mb-4 text-2xl font-bold">카카오 리뷰</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {kakaoReviews.map((review, index) => (
                <ReviewItem
                  key={`kakao-${index}`}
                  naverReview={null}
                  kakaoReview={review}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
