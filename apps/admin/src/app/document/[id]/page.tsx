import { serverFetcher } from "@memory-quasar/shared/utils/repository/serverFetcher";
import { GetDocumentResponse } from "@memory-quasar/shared/utils/repository/document/type";
import styles from "./page.module.css";
import { ButtonGroup } from "@memory-quasar/shared/ui/components/templates/document/[id]/ButtonGroup";
import { MarkdownLeader } from "@memory-quasar/shared/ui/components/molecules/MarkdownLeader";
async function getDocument(id: string) {
  "use server";

  try {
    const result = await serverFetcher<GetDocumentResponse>({
      uri: `/document/${id}`,
      method: "GET",
    });
    if (!result?.document) {
      throw new Error("ドキュメントが見つかりません");
    }
    return result.document;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "予期せぬエラーが発生しました");
  }
}
export default async function DocumentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const document = await getDocument(id);
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>ドキュメント詳細</h1>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{document?.title}</h2>
        <MarkdownLeader content={document?.content} />
      </div>
      <ButtonGroup />
    </main>
  );
}
