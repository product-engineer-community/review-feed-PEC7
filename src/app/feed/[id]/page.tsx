import { fetchNaverReviews } from '@/entities/review/api/crawl';
import { ReviewCard } from '@/entities/review/ui/review-card';

export default async function FeedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reviews = await fetchNaverReviews(id);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">식당 리뷰</h1>
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