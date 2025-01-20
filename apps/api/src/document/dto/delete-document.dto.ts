import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, Matches } from "class-validator";
import { VALIDATION_PATTERNS, DOCUMENT_CONSTANTS } from "@/types/document.types";
import { Transform } from "class-transformer";

export class DeleteDocumentRequest {
  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "ドキュメントID",
  })
  @Transform(({ value }) => value?.replace(/\s+/g, ""))
  @MaxLength(DOCUMENT_CONSTANTS.MAX_ID_LENGTH)
  @Matches(VALIDATION_PATTERNS.CUID)
  id!: string;
}

export class DeleteDocumentResponse {}
