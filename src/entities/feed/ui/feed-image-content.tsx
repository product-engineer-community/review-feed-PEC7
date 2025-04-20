'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ErrorImage } from '@/shared/image/ui';
import { type FeedImageProps } from '@/entities/feed/model/types';

export function FeedImageContent({ src, alt }: FeedImageProps) {
  const [error, setError] = useState(false);
  const fallbackImage = '/images/fallback-food.jpg';

  if (error) {
    return <ErrorImage />;
  }

  return (
    <Image
      src={src || fallbackImage}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={false}
      onError={() => setError(true)}
    />
  );
}
