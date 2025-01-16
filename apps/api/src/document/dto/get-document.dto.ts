import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, Matches } from "class-validator";
import { VALIDATION_PATTERNS, DOCUMENT_CONSTANTS } from "@/types/document.types";
import { Transform } from "class-transformer";

export type Document = {
  id: string;
  title: string;
  content: string;
};

export enum DocumentVisibility {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  PROTECTED = "PROTECTED",
}

export class GetDocumentRequest {
  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "ドキュメントID",
  })
  @Transform(({ value }) => value?.replace(/\s+/g, ""))
  @MaxLength(DOCUMENT_CONSTANTS.MAX_ID_LENGTH)
  @Matches(VALIDATION_PATTERNS.CUID)
  id!: string;
}

export class GetDocumentResponse {
  @ApiProperty({
    example: {
      id: "ckv9ydh6s0000gkpj1wybug0x",
      title: "ドキュメントタイトル",
      content: "ドキュメント内容",
      userName: "ユーザー名",
      spaceId: "ckv9ydh6s0000gkpj1wybug0x",
      userId: "ckv9ydh6s0000gkpj1wybug0x",
      visibility: DocumentVisibility.PUBLIC,
      createdAt: "2025-01-01T00:00:00.000Z",
    },
    description: "ドキュメント情報",
  })
  document!: Document;
}

export class GetDocumentListRequest {
  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "ユーザーID",
  })
  userId!: string;
  @ApiProperty({
    example: "PRIVATE",
    description: "ドキュメントの可視性",
  })
  visibility!: DocumentVisibility;
  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "スペースID",
  })
  spaceId!: string;
}

export class GetDocumentListResponse {
  @ApiProperty({
    example: [],
    description: "ドキュメント情報",
  })
  documents!: Document[];
}
