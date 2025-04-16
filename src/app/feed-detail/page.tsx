import { fetchReviews } from "@/entities/review/api/fetch-reviews";
import { ReviewCard } from "@/entities/review/ui/review-card";

interface FeedDetailPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FeedDetailPage({ searchParams }: FeedDetailPageProps) {
  const params = await searchParams;

  const naverId = typeof params.naver === "string" ? params.naver : undefined;
  const kakaoId = typeof params.kakao === "string" ? params.kakao : undefined;

  if (!naverId && !kakaoId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
          Error: No place IDs provided
        </div>
      </div>
    );
  }

  try {
    const { naverReviews, kakaoReviews } = await fetchReviews(naverId, kakaoId);

    return (
      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <ReviewCard naverReviews={naverReviews} kakaoReviews={kakaoReviews} />
        </div>
      </main>
    );
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
          Error: {error instanceof Error ? error.message : "Failed to fetch reviews"}
        </div>
      </div>
    );
  }
}
