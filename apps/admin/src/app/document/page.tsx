import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { GetDocumentListResponse } from "@memory-quasar/shared/utils/repository/document/type";
import { serverFetcher } from "@memory-quasar/shared/utils/repository/serverFetcher";

async function getDocuments(userId: string, spaceId: string): Promise<GetDocumentListResponse> {
  try {
    const result = await serverFetcher<GetDocumentListResponse>({
      uri: `/document?userId=${userId}&spaceId=${spaceId}`,
      method: "GET",
    });
    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "予期せぬエラーが発生しました");
  }
}

export default async function DocumentPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session?.user?.spaceId) {
    return <div>認証情報の取得に失敗しました</div>;
  }

  let documents: GetDocumentListResponse;
  try {
    documents = await getDocuments(session.user.id, session.user.spaceId);
  } catch (error) {
    return (
      <div>Error: {error instanceof Error ? error.message : "予期せぬエラーが発生しました"}</div>
    );
  }

  return (
    <main>
      <div>
        <h1>ドキュメント一覧</h1>
        <Link href="./document/create" role="button" aria-label="ドキュメントを新規作成">
          ドキュメント新規作成
        </Link>
      </div>
      <ul>
        {documents.documents.map((doc) => (
          <li key={doc.id}>
            <p>{doc.title}</p>
            <Link href={`/document/${doc.id}`}>詳細</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
