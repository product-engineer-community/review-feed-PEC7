import { Inbox } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";

interface EmptyStateProps {
  title?: string;
  message: string;
}

export function EmptyState({
  title = "데이터가 없습니다",
  message,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Card className="w-full max-w-md border-muted">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
