import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";

interface ErrorStateProps {
  title?: string;
  message: string;
}

export function ErrorState({
  title = "오류가 발생했습니다",
  message,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Card className="w-full max-w-md border-destructive/50">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
          <h2 className="mb-2 text-xl font-semibold text-destructive">
            {title}
          </h2>
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
