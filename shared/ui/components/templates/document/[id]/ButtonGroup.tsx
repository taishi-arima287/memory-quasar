"use client";

import { Button } from "@memory-quasar/shared/ui";
import { useRouter } from "next/navigation";
import styles from "./ButtonGroup.module.css";
export interface ButtonGroupProps {
  className?: string;
}

export const ButtonGroup = () => {
  const router = useRouter();
  return (
    <div className={styles.buttonGroup}>
      <Button label="戻る" onClick={() => router.push("/document")} size="xs" variant="primary" />
      <Button label="削除" onClick={() => {}} size="xs" variant="secondary" outline />
    </div>
  );
};
