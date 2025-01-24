import { serverFetcher } from "@memory-quasar/shared/utils/repository/serverFetcher";
import { GetDocumentResponse } from "@memory-quasar/shared/utils/repository/document/type";
import { Update } from "@memory-quasar/shared/ui/components/templates/document/update/[id]/update";
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

export default async function DocumentUpdatePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const document = await getDocument(id);

  return <Update document={document} />;
}
