import { NaverReview, KakaoReview } from "@/entities/review/model/types";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Star } from "lucide-react";

interface ReviewItemProps {
  naverReview?: NaverReview | null;
  kakaoReview?: KakaoReview | null;
}

export function ReviewItem({ naverReview, kakaoReview }: ReviewItemProps) {
  if (naverReview) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={naverReview.profileImage}
              alt={naverReview.nickname}
            />
            <AvatarFallback>{naverReview.nickname.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{naverReview.nickname}</p>
            <p className="text-sm text-muted-foreground">
              {naverReview.visitDate}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {naverReview.photos.length > 0 && (
            <div className="mb-4">
              <img
                src={naverReview.photos[0]}
                alt="Review"
                className="h-48 w-full rounded-lg object-cover"
              />
            </div>
          )}
          <p className="mb-3 text-foreground">{naverReview.body}</p>
          <div className="flex flex-wrap gap-2">
            {naverReview.emojiTags.map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (kakaoReview) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={kakaoReview.profileImage}
              alt={kakaoReview.nickname}
            />
            <AvatarFallback>{kakaoReview.nickname.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{kakaoReview.nickname}</p>
            <p className="text-sm text-muted-foreground">
              {kakaoReview.reviewDate}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {kakaoReview.photos.length > 0 && (
            <div className="mb-4">
              <img
                src={kakaoReview.photos[0]}
                alt="Review"
                className="h-48 w-full rounded-lg object-cover"
              />
            </div>
          )}
          <p className="mb-3 text-foreground">{kakaoReview.body}</p>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-foreground">{kakaoReview.rating}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
