import { Modal } from "./Modal";
import type { Meta, StoryObj } from "@storybook/react";
import ReactModal from "react-modal";
import { Button } from "@memory-quasar/shared/ui";

// モーダルのルート要素を設定
if (typeof document !== "undefined") {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
  ReactModal.setAppElement("#modal-root");
}

const meta = {
  title: "Organisms/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: <div>Modal Content</div>,
    title: "モーダル",
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "モーダル",
    children: <div>モーダルの中身</div>,
    footer: (
      <>
        <Button onClick={() => {}} label="閉じる" size="xs" outline></Button>
        <Button onClick={() => {}} label="進む" size="xs"></Button>
      </>
    ),
  },
};
