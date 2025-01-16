import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsNotEmpty, IsEnum } from "class-validator";
import { DocumentVisibility } from "@prisma/client";

export type Document = {
  id: string;
  title: string;
  content: string;
};

export class PostDocumentRequest {
  @ApiProperty({
    example: "ドキュメントのタイトル",
    description: "ドキュメントのタイトル",
  })
  @MaxLength(255)
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: "ドキュメントの内容",
    description: "ドキュメントの内容",
  })
  content!: string;

  @ApiProperty({
    example: "PUBLIC",
    description: "ドキュメントの可視性",
    enum: DocumentVisibility,
    required: true,
  })
  @IsEnum(DocumentVisibility)
  @IsNotEmpty()
  visibility!: DocumentVisibility;

  @ApiProperty({
    example: "ユーザー名",
    description: "ユーザー名",
  })
  @IsNotEmpty()
  userName!: string;

  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "スペースID",
  })
  spaceId!: string;

  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "ユーザーID",
  })
  userId!: string;
}

export class PostDocumentResponse {
  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "ドキュメントID",
  })
  id!: string;
}
