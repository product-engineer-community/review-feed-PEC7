import { fetchNaverReviews } from "@/src/entities/review/api/crawl-naver";
import { ReviewCard } from "@/entities/review/ui/review-card";

export default async function FeedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reviews = await fetchNaverReviews(id);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">식당 리뷰</h1>
      <ul className="space-y-6">
        {reviews.map((r, i) => (
          <li key={i}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>
    </div>
  );
}
