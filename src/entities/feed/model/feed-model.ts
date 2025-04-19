import { type Feed, type FeedList } from '@/entities/feed/model/types';
import { getFeeds } from '@/entities/feed/api/get-feeds';

export const getFeedList = async (): Promise<FeedList> => {
  return await getFeeds();
};
