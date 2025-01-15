import { DocumentVisibility } from "@prisma/client";

// ドキュメント関連の共通型
export type Document = {
  id: string;
  title: string;
  content: string;
  visibility: DocumentVisibility;
  userId: string;
  spaceId: string | null;
};

// 定数
export const DOCUMENT_CONSTANTS = {
  MAX_TITLE_LENGTH: 255,
  MAX_ID_LENGTH: 36,
} as const;

// バリデーション用の正規表現
export const VALIDATION_PATTERNS = {
  CUID: /^[a-z0-9]+$/,
} as const;
