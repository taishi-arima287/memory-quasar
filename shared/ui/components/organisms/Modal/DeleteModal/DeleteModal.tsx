"use client";
import { Modal } from "@memory-quasar/shared/ui";
import { clientFetcher } from "@memory-quasar/shared/utils/repository/clientFetcher";
import { DeleteDocumentResponse } from "@memory-quasar/shared/utils/repository/document/type";
import { Button } from "@memory-quasar/shared/ui";
import { useRouter } from "next/navigation";
export type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

async function DeleteDocument(id: string) {
  try {
    await clientFetcher<DeleteDocumentResponse>({
      uri: `/document/${id}`,
      method: "DELETE",
    });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "予期せぬエラーが発生しました");
  }
}

export const DeleteModal = ({ isOpen, onClose, id }: DeleteModalProps) => {
  const router = useRouter();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="削除確認"
      footer={
        <>
          <Button onClick={() => onClose()} label="閉じる" outline />
          <Button
            onClick={async () => {
              await DeleteDocument(id);
              router.push("/document");
            }}
            label="削除"
            variant="tertiary"
          />
        </>
      }
    >
      <div>
        <p>ドキュメントを削除しますか？</p>
      </div>
    </Modal>
  );
};
