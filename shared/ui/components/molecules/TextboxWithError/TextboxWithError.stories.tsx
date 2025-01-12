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
    label: 'メールアドレス',
    placeholder: 'example@example.com',
    value: '',
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    label: 'メールアドレス',
    placeholder: 'example@example.com',
    value: 'invalid-email',
    onChange: () => {},
    error: 'メールアドレスの形式が正しくありません',
  },
};

export const WithSize: Story = {
  args: {
    label: 'ユーザー名',
    placeholder: 'ユーザー名を入力',
    value: '',
    onChange: () => {},
    size: 'lg',
  },
};

export const PasswordType: Story = {
  args: {
    label: 'パスワード',
    type: 'password',
    placeholder: '••••••••',
    value: 'password123',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: '編集不可フィールド',
    value: '編集できない値',
    onChange: () => {},
    disabled: true,
  },
}; 