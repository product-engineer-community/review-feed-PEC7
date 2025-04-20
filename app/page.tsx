import { FeedItem } from '@/entities/feed/ui';
import { getFeedList } from '@/entities/feed/model/feed-model';

export default async function Home() {
  const feeds = await getFeedList();

  return (
    <main>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="grid grid-cols-2 gap-4">
          {feeds.map((feed) => (
            <FeedItem key={feed.id} feed={feed} />
          ))}
        </div>
      </div>
    </main>
  );
}
