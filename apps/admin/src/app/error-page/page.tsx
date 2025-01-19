"use client";

import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Button } from "@memory-quasar/shared/ui";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorMessage = searchParams.get("message");
  const returnPath = searchParams.get("returnPath") || "/";

  return (
    <main className={styles.error}>
      <h2>エラーが発生しました</h2>
      <p>{errorMessage}</p>
      <div className={styles.buttonContainer}>
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
