"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./error.module.css";
import { Button } from "@memory-quasar/shared/ui";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.error}>
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <div className={styles.buttonContainer}>
        <p>前の画面に戻って再度お試しください</p>
        <Button onClick={() => router.push("/")} label="ホームに戻る" size="xs" variant="primary" />
      </div>
    </div>
  );
}
