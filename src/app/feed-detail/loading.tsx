import { Skeleton } from "@/shared/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";

export default function FeedDetailLoading() {
  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Naver Reviews Section */}
        <section className="mb-8">
          <Skeleton className="mb-4 h-8 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={`naver-${index}`}>
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
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, tagIndex) => (
                      <Skeleton
                        key={`naver-tag-${tagIndex}`}
                        className="h-6 w-16"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Kakao Reviews Section */}
        <section>
          <Skeleton className="mb-4 h-8 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={`kakao-${index}`}>
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
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="ml-1 h-4 w-8" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
