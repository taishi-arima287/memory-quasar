import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, Matches } from "class-validator";
import { DocumentVisibility } from "@prisma/client";
import { VALIDATION_PATTERNS, DOCUMENT_CONSTANTS } from "@/types/document.types";
import { Transform } from "class-transformer";

export class GetDocumentListRequest {
  @ApiProperty({
    example: "clrjl0mlw0001gkpj1wybug0x",
    description: "ユーザーID",
  })
  @Transform(({ value }) => value?.replace(/\s+/g, ""))
  @MaxLength(DOCUMENT_CONSTANTS.MAX_ID_LENGTH)
  @Matches(VALIDATION_PATTERNS.CUID)
  userId!: string;

  @ApiProperty({
    example: "clrjl0mlw0002gkpj1wybug0x",
    description: "スペースID",
  })
  @Transform(({ value }) => value?.replace(/\s+/g, ""))
  @MaxLength(DOCUMENT_CONSTANTS.MAX_ID_LENGTH)
  @Matches(VALIDATION_PATTERNS.CUID)
  spaceId!: string;
}

export class GetDocumentListResponse {
  @ApiProperty({
    example: [
      {
        id: "clrjl0mlw0000gkpj1wybug0x",
        title: "ドキュメントのタイトル",
        content: "ドキュメントの内容",
        visibility: DocumentVisibility.PUBLIC,
        userId: "clrjl0mlw0001gkpj1wybug0x",
        spaceId: "clrjl0mlw0002gkpj1wybug0x",
      },
    ],
    description: "ドキュメント一覧",
    isArray: true,
  })
  documents!: {
    id: string;
    title: string;
    content: string;
    visibility: DocumentVisibility;
    userId: string;
    spaceId: string | null;
  }[];
}
