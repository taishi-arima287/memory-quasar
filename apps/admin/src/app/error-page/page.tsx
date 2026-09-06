"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@memory-quasar/shared/ui";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorMessage = searchParams.get("message");
  const returnPath = searchParams.get("returnPath") || "/";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <h2>エラーが発生しました</h2>
      <p>{errorMessage}</p>
      <div className="flex flex-col items-center gap-3">
        <p>前の画面に戻って再度お試しください</p>
        <Button
          onClick={() => router.push(returnPath)}
          label="前の画面に戻る"
          size="xs"
          variant="primary"
        />
      </div>
    </main>
  );
}
