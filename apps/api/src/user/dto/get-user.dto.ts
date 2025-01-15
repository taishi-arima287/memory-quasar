import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, Matches } from "class-validator";
import { User, USER_CONSTANTS, USER_VALIDATION_PATTERNS } from "@/types/user.types";
import { Transform } from "class-transformer";

export class GetUserRequest {
  @ApiProperty({
    example: "clrjl0mlw0001gkpj1wybug0x",
    description: "ユーザーID",
  })
  @Transform(({ value }) => value?.replace(/\s+/g, ""))
  @MaxLength(USER_CONSTANTS.MAX_ID_LENGTH)
  @Matches(USER_VALIDATION_PATTERNS.CUID)
  id!: string;
}

export class GetUserResponse {
  @ApiProperty({
    example: {
      id: "clrjl0mlw0001gkpj1wybug0x",
      email: "user@example.com",
      name: "John Doe",
    },
    description: "ユーザー情報",
  })
  user!: User;
}
