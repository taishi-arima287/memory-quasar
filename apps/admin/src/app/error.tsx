"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>エラーが発生しました</h2>
      <button onClick={() => router.push("/")}>ホームに戻る</button>
    </div>
  );
}
