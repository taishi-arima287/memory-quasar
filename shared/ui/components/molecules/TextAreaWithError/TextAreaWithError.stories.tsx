import type { Meta, StoryObj } from "@storybook/react";
import { TextAreaWithError } from "./TextAreaWithError";

const meta = {
  title: "Molecules/TextAreaWithError",
  component: TextAreaWithError,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextAreaWithError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "テキストエリア",
    value: "",
    placeholder: "テキストを入力",
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: "テキストエリア",
    value: "エラーのあるテキスト",
    error: "エラーメッセージ",
    placeholder: "テキストを入力",
    rows: 4,
  },
};
