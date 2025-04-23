import { Card, CardContent, CardHeader } from "@/src/shared/ui";
import { KakaoPlaceInfo } from "../model";
import Image from "next/image";

export function DetailInfo({ place }: { place: KakaoPlaceInfo }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        {place.mainImage && (
          <div className="relative h-64 w-full overflow-hidden rounded-md">
            <Image
              src={
                place.mainImage.startsWith("http")
                  ? place.mainImage
                  : `https:${place.mainImage}`
              }
              alt={place.name}
              fill
              className="rounded-md object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
              priority
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <h2 className="text-xl font-bold">{place.name}</h2>
        <p className="text-sm text-muted-foreground">{place.rating} ⭐</p>
        <p>
          <strong>상태:</strong> {place.openState}
        </p>
        <p>
          <strong>영업시간:</strong> {place.openUntil}
        </p>
        <p>
          <strong>리뷰 수:</strong> {place.reviewCount}
        </p>

        {place.address && (
          <p>
            <strong>주소:</strong> {place.address}
          </p>
        )}
        {place.phone && (
          <p>
            <strong>전화:</strong> {place.phone}
          </p>
        )}
        {place.homepage && (
          <p>
            <strong>홈페이지:</strong>{" "}
            <a
              href={place.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {place.homepage}
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
