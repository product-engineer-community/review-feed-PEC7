import { type Feed } from './types';

export type FeedItemProps = {
  feed: Feed;
};

export type FeedItemInfoProps = {
  rating: number;
  reviewText: string;
  restaurantName: string;
};

export type FeedItemRatingProps = {
  rating: number;
};

export type FeedItemContentProps = {
  reviewText: string;
  restaurantName: string;
};
