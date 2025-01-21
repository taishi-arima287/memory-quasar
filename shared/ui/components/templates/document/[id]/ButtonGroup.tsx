"use client";

import { Button } from "@memory-quasar/shared/ui";
import { useRouter, useParams } from "next/navigation";
import styles from "./ButtonGroup.module.css";
import {
  useDeleteModal,
  DeleteModal,
} from "@memory-quasar/shared/ui/components/organisms/Modal/DeleteModal";
export interface ButtonGroupProps {
  className?: string;
}

export const ButtonGroup = () => {
  const router = useRouter();
  const { isOpen, open, close } = useDeleteModal();
  const params = useParams();
  const id = params.id as string;
  return (
    <div className={styles.buttonGroup}>
      <Button
        label="戻る"
        onClick={() => router.push("/document")}
        size="xs"
        variant="primary"
        outline
      />
      <Button label="削除" onClick={() => open()} size="xs" variant="tertiary" />
      <DeleteModal isOpen={isOpen} onClose={close} id={id} />
    </div>
  );
};
