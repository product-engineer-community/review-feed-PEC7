import { Feed } from '../model/types';

interface FeedItemProps {
  feed: Feed;
}

export const FeedItem = ({ feed }: FeedItemProps) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      {/* 이미지 */}
      <div className="relative">
        <img
          src={feed.imageUrl}
          alt={feed.content}
          className="aspect-square w-full object-cover"
        />
        <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-white">
          ★ {feed.rating.toFixed(1)}
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="px-4 pb-4">
        <p className="mb-2 font-medium">{feed.reviewText}</p>
        <p className="text-sm text-gray-500">{feed.restaurantName}</p>
        <p className="text-sm text-gray-500">
          {new Date(feed.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
