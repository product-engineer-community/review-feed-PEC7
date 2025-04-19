import { type SkeletonImageProps } from '../model';

export function SkeletonImage({
  className = 'absolute inset-0 animate-pulse bg-gray-200',
}: SkeletonImageProps) {
  return <div className={className} />;
}
