import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";

interface LoadingStateProps {
  title?: string;
  message?: string;
}

export function LoadingState({
  title = "로딩 중",
  message = "데이터를 불러오는 중입니다...",
}: LoadingStateProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Card className="w-full max-w-md border-muted">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
          <h2 className="mb-2 text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
