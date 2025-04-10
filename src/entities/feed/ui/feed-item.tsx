import { Feed } from '../model/types';

interface FeedItemProps {
  feed: Feed;
}

export const FeedItem = ({ feed }: FeedItemProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* 이미지 */}
      <div className="relative aspect-square">
        <img
          src={feed.image_url}
          alt={feed.title}
          className="h-full w-full object-cover"
        />
        {/* 오버레이 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* 컨텐츠 오버레이 */}
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <div className="mb-1 flex items-center">
            <span className="mr-1 text-lg">★</span>
            <span className="font-medium">{feed.rating.toFixed(1)}</span>
          </div>
          <p className="mb-1 line-clamp-2 text-sm font-medium">
            {feed.review_text}
          </p>
          <p className="text-sm text-white/80">{feed.restaurant_name}</p>
        </div>
      </div>
    </div>
  );
};
