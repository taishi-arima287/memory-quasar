import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, Matches } from "class-validator";

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
  @MaxLength(36)
  @Matches(/^c[a-z0-9]+$/)
  id!: string;
}

export class GetDocumentResponse {
  @ApiProperty({
    example: {
      id: "ckv9ydh6s0000gkpj1wybug0x",
      title: "ドキュメントタイトル",
      content: "ドキュメント内容",
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
