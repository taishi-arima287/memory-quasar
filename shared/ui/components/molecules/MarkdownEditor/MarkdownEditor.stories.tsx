import { MarkdownEditor } from "./MarkdownEditor";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/MarkdownEditor",
  component: MarkdownEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MarkdownEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "マークダウンエディタ",
  },
};
