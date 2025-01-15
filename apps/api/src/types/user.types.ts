// ユーザー関連の共通型
export type User = {
  id: string;
  email: string;
  name: string;
};

// 定数
export const USER_CONSTANTS = {
  MAX_ID_LENGTH: 36,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255,
} as const;

// バリデーション用の正規表現
export const USER_VALIDATION_PATTERNS = {
  CUID: /^[a-z0-9]+$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
} as const;
