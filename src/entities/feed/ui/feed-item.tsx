import { type Feed, type FeedItemProps } from '@/entities/feed/model';
import FeedImage from '@/entities/feed/ui/feed-image';
import { FeedItemInfo } from '@/entities/feed/ui/feed-item-info';

export function FeedItem({ feed }: FeedItemProps) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative aspect-square">
        <FeedImage src={feed.image_url} alt={feed.title || '음식 이미지'} />
        <FeedItemInfo
          rating={feed.rating}
          reviewText={feed.review_text}
          restaurantName={feed.restaurant_name}
        />
      </div>
    </div>
  );
}
