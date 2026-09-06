import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";
import {
  GetDocumentListResponse,
  GetDocumentListRequest,
} from "@memory-quasar/shared/utils/repository/document/type";
import { serverFetcher } from "@memory-quasar/shared/utils/repository/serverFetcher";
async function getDocuments(userId: string, spaceId: string): Promise<GetDocumentListResponse> {
  "use server";
  try {
    const result = await serverFetcher<GetDocumentListResponse, GetDocumentListRequest>({
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
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 p-4">
        <h1>ドキュメント一覧</h1>
        <Link
          href="./document/create"
          role="button"
          aria-label="ドキュメントを新規作成"
          className="text-link no-underline hover:underline"
        >
          ドキュメント新規作成
        </Link>
      </div>
      <ul className="mx-auto flex max-w-3xl flex-wrap gap-3 p-3">
        {documents.documents.map((document) => (
          <li
            key={document.id}
            className="flex h-80 min-w-60 flex-col items-center justify-between rounded-lg border border-border pb-3"
          >
            <div className="h-50 w-full rounded-t-lg bg-not-image">
              {document.thumbnail && (
                <Image src={document.thumbnail} width={320} height={200} alt={document.title} />
              )}
            </div>
            <div className="flex h-25 w-full flex-col items-center justify-between">
              <h3 className="w-full max-w-xs overflow-hidden pt-1 pl-3 text-left text-base font-semibold text-ellipsis whitespace-nowrap">
                {document.title}
              </h3>
              <div className="flex gap-3">
                <Link
                  href={`/document/${document.id}`}
                  className="text-link no-underline hover:underline"
                >
                  詳細
                </Link>
                <Link
                  href={`/document/update/${document.id}`}
                  className="text-link no-underline hover:underline"
                >
                  更新
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
