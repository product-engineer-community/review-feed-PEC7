import { Feed, FeedList } from './types';
import { getFeeds } from '../api/get-feeds';

export const getFeedList = async (): Promise<FeedList> => {
  return await getFeeds();
};
