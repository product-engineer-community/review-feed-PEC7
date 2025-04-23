import { Card, CardContent, CardHeader } from "@/src/shared/ui";
import { KakaoReview } from "../model";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";
import { Star } from "lucide-react";

export function KakaoReviewCard({ review }: { review: KakaoReview }) {
  return (
    <Card>
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
  );
}
