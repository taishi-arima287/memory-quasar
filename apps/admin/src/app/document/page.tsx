"use client";

import { useSession } from "next-auth/react";
// import styles from "./page.module.css";
import Link from "next/link";

export default function DocumentPage() {
  const { data: session } = useSession();

  return (
    <main>
      <div>
        <h1>ドキュメント一覧</h1>
        <p>{session ? <>{JSON.stringify(session, null, 2)}</> : "ログインしていません"}</p>
        <Link href="./document/create" role="button" aria-label="ドキュメントを新規作成">
          ドキュメント新規作成
        </Link>
      </div>
    </main>
  );
}
