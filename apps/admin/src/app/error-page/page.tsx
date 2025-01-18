"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorMessage = searchParams.get("message");
  const returnPath = searchParams.get("returnPath") || "/";

  return (
    <main>
      <h2>エラーが発生しました</h2>
      <p>{errorMessage}</p>
      <button onClick={() => router.push(returnPath)}>戻る</button>
    </main>
  );
}
