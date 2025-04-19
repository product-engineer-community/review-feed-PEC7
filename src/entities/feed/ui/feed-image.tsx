'use client';

import { Suspense } from 'react';
import { SkeletonImage } from '@/shared/image/ui';
import { type FeedImageProps } from '@/entities/feed/model/types';
import { FeedImageContent } from '@/entities/feed/ui/feed-image-content';

export default function FeedImage(props: FeedImageProps) {
  return (
    <Suspense fallback={<SkeletonImage />}>
      <FeedImageContent {...props} />
    </Suspense>
  );
}
