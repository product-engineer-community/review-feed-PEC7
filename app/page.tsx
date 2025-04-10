'use client';

import { FeedItem } from '@/entities/feed/ui';
import { useFeedList } from '@/entities/feed/model';
import { Feed } from '@/entities/feed/model/types';

export default function Home() {
  const { feeds, isLoading } = useFeedList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-3xl font-bold">맛집 피드</h1>
        <div className="space-y-6">
          {feeds.map((feed) => (
            <FeedItem key={feed.id} feed={feed} />
          ))}
        </div>
      </div>
    </main>
  );
}
