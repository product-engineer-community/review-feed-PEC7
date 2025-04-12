export interface NaverReview {
  nickname: string;
  profileImage: string;
  stats: string[];
  photos: string[];
  visitKeywords: string[];
  emojiTags: string[];
  visitDate: string;
  verification: string[];
  moreText: boolean;
  body: string;
  moreKeywords: string;
}

export interface KakaoReview {
  nickname: string;
  profileImage: string;
  reviewDate: string;
  rating: string;
  body: string;
  photos: string[];
}
