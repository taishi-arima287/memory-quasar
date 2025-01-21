import { Modal } from "./Modal";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import ReactModal from "react-modal";
import { Button } from "@memory-quasar/shared/ui";

const ModalDecorator = (Story: any) => {
  useEffect(() => {
    ReactModal.setAppElement("#storybook-root");
  }, []);

  return <Story />;
};

const meta = {
  title: "Organisms/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [ModalDecorator],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
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
