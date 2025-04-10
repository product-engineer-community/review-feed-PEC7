import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8 text-card-foreground shadow">
        <Loader2 className="h-12 w-12 animate-spin" />
        <p className="text-lg font-medium">위치 정보를 가져오는 중...</p>
      </div>
    </div>
  );
}
