import type { Meta, StoryObj } from '@storybook/react';
import { TextboxWithError } from './TextboxWithError';

const meta = {
  title: 'Molecules/TextboxWithError',
  component: TextboxWithError,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextboxWithError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'テキストを入力してください',
    value: '',
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'テキストを入力してください',
    value: '不正な入力値',
    onChange: () => {},
    error: 'この項目は必須です',
  },
}; 