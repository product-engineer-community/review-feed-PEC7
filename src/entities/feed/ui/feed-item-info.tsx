import { type FeedItemInfoProps } from '@/entities/feed/model';
import { FeedItemRating } from '@/entities/feed/ui/feed-item-rating';
import { FeedItemContent } from '@/entities/feed/ui/feed-item-content';

export function FeedItemInfo({
  rating,
  reviewText,
  restaurantName,
}: FeedItemInfoProps) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
        <FeedItemRating rating={rating} />
        <FeedItemContent
          reviewText={reviewText}
          restaurantName={restaurantName}
        />
      </div>
    </>
  );
}
