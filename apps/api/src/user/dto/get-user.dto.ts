import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, Matches } from "class-validator";

export type User = {
  id: string;
  email: string;
  name: string;
};

export class GetUserRequest {
  @ApiProperty({
    example: "ckv9ydh6s0000gkpj1wybug0x",
    description: "ユーザーID",
  })
  @MaxLength(36)
  @Matches(/^c[a-z0-9]+$/)
  id!: string;
}

export class GetUserResponse {
  @ApiProperty({
    example: {
      id: "ckv9ydh6s0000gkpj1wybug0x",
      email: "user@example.com",
      name: "John Doe",
    },
    description: "ユーザー情報",
  })
  user!: User;
}
