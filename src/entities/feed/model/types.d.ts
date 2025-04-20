// Feed 관련 타입 정의
export interface Feed {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
  rating: number;
  review_text: string;
  restaurant_name: string;
}

export type FeedList = Feed[];

export interface FeedLikeResponse {
  success: boolean;
  likeCount: number;
  isLiked: boolean;
}

export type FeedImageProps = {
  src?: string;
  alt: string;
};
