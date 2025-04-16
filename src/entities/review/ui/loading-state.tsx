import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

interface LoadingStateProps {
  platform: "naver" | "kakao";
  count?: number;
}

// Generate unique keys for skeleton items
function getSkeletonKey(
  platform: "naver" | "kakao",
  type: string,
  index: number,
): string {
  return `${platform}-skeleton-${type}-${index}`;
}

export function LoadingState({ platform, count = 6 }: LoadingStateProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={getSkeletonKey(platform, "card", index)}>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-4 h-48 w-full rounded-lg" />
            <Skeleton className="mb-3 h-4 w-full" />
            <Skeleton className="mb-3 h-4 w-3/4" />
            {platform === "naver" ? (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, tagIndex) => (
                  <Skeleton
                    key={getSkeletonKey(platform, "tag", tagIndex)}
                    className="h-6 w-16"
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="ml-1 h-4 w-8" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
