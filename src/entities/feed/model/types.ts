// Feed 관련 타입 정의
export interface Feed {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  imageUrl: string;
  rating: number;
  reviewText: string;
  restaurantName: string;
}

export type FeedList = Feed[];

export interface FeedLikeResponse {
  success: boolean;
  likeCount: number;
  isLiked: boolean;
}
