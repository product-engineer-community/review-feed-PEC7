import { Card, CardContent, CardHeader } from "@/src/shared/ui";
import { NaverReview } from "../model";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";
import { Badge } from "@/src/shared/ui/badge";

export function NaverReviewCard({ review }: { review: NaverReview }) {
  return (
    <Card>
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
          {review.emojiTags.map((tag, i) => (
            <Badge key={i} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
