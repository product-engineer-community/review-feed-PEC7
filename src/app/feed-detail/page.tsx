"use client";

import { NaverReview, KakaoReview } from "@/entities/review/model/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FeedState {
  naverReviews: NaverReview[];
  kakaoReviews: KakaoReview[];
  isLoading: boolean;
  error: string | null;
}

async function fetchReviews(naverId?: string, kakaoId?: string) {
  const params = new URLSearchParams();
  if (naverId) params.append("naver", naverId);
  if (kakaoId) params.append("kakao", kakaoId);

  console.log(`Fetching reviews with params: ${params.toString()}`);

  const response = await fetch(`/api/reviews?${params.toString()}`);

  console.log(`Response status: ${response.status}`);

  if (!response.ok) {
    const error = await response.json();
    console.error(`Error fetching reviews: ${error.error}`);
    throw new Error(error.error || "Failed to fetch reviews");
  }

  const data = await response.json();
  console.log(`Fetched reviews:`, data);

  return data as Promise<{
    naverReviews: NaverReview[];
    kakaoReviews: KakaoReview[];
  }>;
}

export default function FeedPage() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<FeedState>({
    naverReviews: [],
    kakaoReviews: [],
    isLoading: false,
    error: null,
  });

  // Set document title based on search params
  useEffect(() => {
    const naverId = searchParams.get("naver");
    const kakaoId = searchParams.get("kakao");
    document.title = `Reviews - ${naverId || kakaoId || "All"}`;
  }, [searchParams]);

  useEffect(() => {
    const loadReviews = async () => {
      const naverId = searchParams.get("naver") || undefined;
      const kakaoId = searchParams.get("kakao") || undefined;

      if (!naverId && !kakaoId) {
        setState((prev) => ({ ...prev, error: "No place IDs provided" }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const { naverReviews, kakaoReviews } = await fetchReviews(
          naverId,
          kakaoId,
        );
        setState((prev) => ({
          ...prev,
          naverReviews,
          kakaoReviews,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to fetch reviews",
          isLoading: false,
        }));
      }
    };

    loadReviews();
  }, [searchParams]);

  if (state.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          Error: {state.error}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {state.naverReviews.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">네이버 리뷰</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {state.naverReviews.map((review: NaverReview, index: number) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow-md">
                  <div className="mb-4 flex items-center space-x-3">
                    <img
                      src={review.profileImage}
                      alt={review.nickname}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{review.nickname}</p>
                      <p className="text-sm text-gray-500">
                        {review.visitDate}
                      </p>
                    </div>
                  </div>
                  {review.photos.length > 0 && (
                    <div className="mb-4">
                      <img
                        src={review.photos[0]}
                        alt="Review"
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <p className="mb-3 text-gray-800">{review.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {review.emojiTags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {state.kakaoReviews.length > 0 && (
          <section>
            <h2 className="mb-4 text-2xl font-bold">카카오 리뷰</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {state.kakaoReviews.map((review: KakaoReview, index: number) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow-md">
                  <div className="mb-4 flex items-center space-x-3">
                    <img
                      src={review.profileImage}
                      alt={review.nickname}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{review.nickname}</p>
                      <p className="text-sm text-gray-500">
                        {review.reviewDate}
                      </p>
                    </div>
                  </div>
                  {review.photos.length > 0 && (
                    <div className="mb-4">
                      <img
                        src={review.photos[0]}
                        alt="Review"
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <p className="mb-3 text-gray-800">{review.body}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-700">{review.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {state.naverReviews.length === 0 && state.kakaoReviews.length === 0 && (
          <div className="text-center text-gray-500">No reviews available</div>
        )}
      </div>
    </main>
  );
}
