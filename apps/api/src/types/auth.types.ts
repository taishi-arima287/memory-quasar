import { User } from "./user.types";

// 認証関連の共通型
export type LoginResponse = {
  access_token: string;
  user: User;
};

// 定数
export const AUTH_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 100,
  TOKEN_EXPIRES_IN: "1d",
} as const;

// バリデーション用の正規表現
export const AUTH_VALIDATION_PATTERNS = {
  PASSWORD: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
} as const;
