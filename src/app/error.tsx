"use client";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 서비스로 에러 전송
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-[400px] space-y-4 rounded-lg border bg-card p-6 text-card-foreground shadow">
        <div className="rounded-md bg-destructive/15 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">오류가 발생했습니다</p>
          </div>
          <p className="mt-2 text-sm text-destructive">{error.message}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  );
}
