import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    label: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "primary",
    size: "md",
    label: "Button",
    outline: true,
  },
};
