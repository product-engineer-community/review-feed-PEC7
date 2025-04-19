import { type FeedItemRatingProps } from '@/entities/feed/model';

export function FeedItemRating({ rating }: FeedItemRatingProps) {
  return (
    <div className="mb-1 flex items-center">
      <span className="mr-1 text-lg">★</span>
      <span className="font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}
