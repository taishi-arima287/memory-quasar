import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { DocumentVisibility } from "@prisma/client";

export type Document = {
  id: string;
  title: string;
  content: string;
};

export class PutDocumentRequest {
  @ApiProperty({
    example: "更新後のタイトル",
    description: "ドキュメントのタイトル",
  })
  @MaxLength(255)
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: "更新後の内容",
    description: "ドキュメントの内容",
  })
  @IsNotEmpty()
  content!: string;

  @ApiProperty({
    example: "PUBLIC",
    description: "ドキュメントの可視性",
    enum: DocumentVisibility,
  })
  @IsEnum(DocumentVisibility)
  @IsNotEmpty()
  visibility!: DocumentVisibility;

  @ApiProperty({
    example: "https://example.com/thumbnail.jpg",
    description: "サムネイルURL",
    required: false,
  })
  @IsOptional()
  thumbnail?: string;
}

export class PutDocumentResponse {
  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "更新したドキュメントID",
  })
  id!: string;
}
