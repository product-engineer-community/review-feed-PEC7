import { NaverReview, KakaoReview } from "@/entities/review/model/types";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Star } from "lucide-react";

export function ReviewCard({
  naverReviews,
  kakaoReviews,
}: {
  naverReviews: NaverReview[];
  kakaoReviews: KakaoReview[];
}) {
  return (
    <>
      {naverReviews.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">네이버 리뷰</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {naverReviews.map((review, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={review.profileImage} alt={review.nickname} />
                    <AvatarFallback>{review.nickname.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.nickname}</p>
                    <p className="text-sm text-muted-foreground">{review.visitDate}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  {review.photos.length > 0 && (
                    <div className="mb-4">
                      <img
                        src={review.photos[0]}
                        alt="Review"
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <p className="mb-3 text-foreground">{review.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {review.emojiTags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {kakaoReviews.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">카카오 리뷰</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kakaoReviews.map((review, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={review.profileImage} alt={review.nickname} />
                    <AvatarFallback>{review.nickname.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.nickname}</p>
                    <p className="text-sm text-muted-foreground">{review.reviewDate}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  {review.photos.length > 0 && (
                    <div className="mb-4">
                      <img
                        src={review.photos[0]}
                        alt="Review"
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <p className="mb-3 text-foreground">{review.body}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-foreground">{review.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
