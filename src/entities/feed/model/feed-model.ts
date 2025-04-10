import { Feed, FeedList } from './types';

const MOCK_FEEDS: FeedList = [
  {
    id: '1',
    content: '맛있는 파스타 맛집',
    createdAt: '2024-03-20T12:00:00Z',
    userId: 'user1',
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    rating: 4.5,
    reviewText:
      '알덴테로 잘 삶아진 파스타와 깊은 맛의 소스가 일품이에요. 분위기도 좋아서 데이트하기 좋습니다.',
    restaurantName: '벨라 파스타',
  },
  {
    id: '2',
    content: '숨은 맛집 발견!',
    createdAt: '2024-03-19T15:30:00Z',
    userId: 'user2',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    rating: 5.0,
    reviewText:
      '피자도 맛있고 샐러드도 신선해요. 특히 도우가 쫄깃하면서 바삭해서 좋았어요.',
    restaurantName: '피자 파라다이스',
  },
  {
    id: '3',
    content: '브런치 카페',
    createdAt: '2024-03-18T09:15:00Z',
    userId: 'user3',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    rating: 4.0,
    reviewText:
      '아침부터 건강한 샐러드와 신선한 과일주스로 상쾌하게 시작했어요.',
    restaurantName: '모닝 브런치',
  },
];

// Feed 모델 함수들
export const useFeedList = () => {
  // TODO: Implement with React Query or SWR
  return {
    feeds: MOCK_FEEDS,
    isLoading: false,
  };
};

export const useFeedById = (id: string) => {
  // TODO: Implement with React Query or SWR
  const feed = MOCK_FEEDS.find((feed) => feed.id === id);
  return {
    feed: feed || null,
    isLoading: false,
  };
};
