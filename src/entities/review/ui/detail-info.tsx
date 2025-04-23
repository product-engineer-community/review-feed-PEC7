import { KakaoPlaceInfo } from "@/entities/review/model/types";
import { Card, CardHeader, CardContent } from "@/shared/ui/card";

export function DetailInfo({ place }: { place: KakaoPlaceInfo }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <h2 className="text-xl font-bold">{place.name}</h2>
        <p className="text-sm text-muted-foreground">{place.category}</p>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          <strong>주소:</strong> {place.address}
        </p>
        <p>
          <strong>전화번호:</strong> {place.phone}
        </p>
      </CardContent>
    </Card>
  );
}
