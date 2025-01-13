import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, Matches } from "class-validator";

export class GetUserDto {
  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "ユーザーID",
  })
  @MaxLength(36)
  @Matches(/^c[a-z0-9]+$/)
  id!: string;
}
