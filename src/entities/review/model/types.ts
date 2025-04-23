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

export interface KakaoPlaceInfo {
  name: string;
  mainImage: string;
  rating: string;
  openState: string;
  openUntil: string;
  reviewCount: string;
  address?: string;
  phone?: string;
  homepage?: string;
}

export interface KakaoPlaceData {
  placeInfo: KakaoPlaceInfo;
  reviews: KakaoReview[];
}
