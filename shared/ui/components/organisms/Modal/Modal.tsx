"use client";

import ReactModal from "react-modal";
import { useEffect } from "react";
import styles from "./Modal.module.css";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactModal.setAppElement("#modal-root");
    }
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalHeader}>
        <h2>{title}</h2>
      </div>
      <div className={styles.modalContent}>{children}</div>
      <div className={styles.modalFooter}>{footer}</div>
    </ReactModal>
  );
};
