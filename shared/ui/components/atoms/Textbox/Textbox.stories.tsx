import type { Meta, StoryObj } from "@storybook/react";
import { Textbox } from "./Textbox";

const meta = {
  title: "Atoms/Textbox",
  component: Textbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "テキストを入力してください",
    value: "",
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    placeholder: "テキストを入力してください",
    value: "不正な入力値",
    onChange: () => {},
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "テキストを入力してください",
    value: "",
    onChange: () => {},
    disabled: true,
  },
};
