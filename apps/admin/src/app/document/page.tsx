"use client";

import { useSession } from "next-auth/react";
import styles from "./page.module.css";

export default function DocumentPage() {
  const { data: session } = useSession();

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Memory Quasar Document</h1>
        <p>{session ? <>{JSON.stringify(session, null, 2)}</> : "ログインしていません"}</p>
      </div>
    </main>
  );
}
