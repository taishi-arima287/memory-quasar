"use client";

import ReactModal from "react-modal";
import { useEffect } from "react";

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
      className="flex w-full max-w-150 flex-col gap-3 rounded-xl bg-white p-3"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div className="flex h-4 w-full justify-center">
        <h2>{title}</h2>
      </div>
      <div className="flex min-h-25 items-center justify-center gap-3">{children}</div>
      <div className="flex w-full justify-center gap-3">{footer}</div>
    </ReactModal>
  );
};
