import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

type LoginUser = {
  id: string;
  email: string;
  name: string;
};

export class LoginRequest {
  @ApiProperty({
    example: "user@example.com",
    description: "ログイン用メールアドレス",
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: "password123",
    description: "ログイン用パスワード（8文字以上）",
  })
  @IsString()
  @MinLength(8)
  password!: string;
}

export class LoginResponse {
  @ApiProperty({
    example: {
      id: "ckv9ydh6s0000gkpj1wybug0x",
      email: "user@example.com",
      name: "John Doe",
    },
    description: "ユーザー情報",
  })
  user!: LoginUser;
}

export class LoginOriginResponse extends LoginResponse {
  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    description: "JWTアクセストークン",
  })
  access_token!: string;
}
