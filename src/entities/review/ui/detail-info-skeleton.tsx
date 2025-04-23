import { Card, CardContent, CardHeader } from "@/src/shared/ui";
import { Skeleton } from "@/src/shared/ui/skeleton";

export function DetailInfoSkeleton() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="relative h-64 w-full overflow-hidden rounded-md">
          <Skeleton className="absolute h-full w-full rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}
