// src/app/feed/[id]/page.tsx

import { Suspense } from 'react';
import { fetchNaverReviews } from '@/entities/review/api/crawl';
import { ReviewCard } from '@/entities/review/ui/review-card';
import { Skeleton } from '@/shared/ui';
import { NaverReview } from '@/entities/review/model/types';

function ReviewList({ reviews }: { reviews: Awaited<ReturnType<typeof fetchNaverReviews>> }) {
  return (
    <ul className="space-y-6">
      {reviews.map((r: NaverReview, i: number) => (
        <li key={i}>
          <ReviewCard review={r} />
        </li>
      ))}
    </ul>
  );
}

function ReviewSkeletonList() {
  return (
    <ul className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i}>
          <Skeleton />
        </li>
      ))}
    </ul>
  );
}

export default async function FeedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reviewsPromise = fetchNaverReviews(id);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">식당 리뷰</h1>
      <Suspense fallback={<ReviewSkeletonList />}>
        {/* @ts-expect-error Async Component */}
        <ReviewList reviews={reviewsPromise} />
      </Suspense>
    </div>
  );
}
