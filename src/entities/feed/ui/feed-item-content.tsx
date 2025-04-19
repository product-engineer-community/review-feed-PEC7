import { type FeedItemContentProps } from '@/entities/feed/model';

export function FeedItemContent({
  reviewText,
  restaurantName,
}: FeedItemContentProps) {
  return (
    <>
      <p className="mb-1 line-clamp-2 text-sm font-medium">{reviewText}</p>
      <p className="text-sm text-white/80">{restaurantName}</p>
    </>
  );
}
