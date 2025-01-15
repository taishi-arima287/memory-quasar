import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User, USER_CONSTANTS, USER_VALIDATION_PATTERNS } from "@/types/user.types";
import { AUTH_CONSTANTS, AUTH_VALIDATION_PATTERNS } from "@/types/auth.types";

export class LoginUser implements User {
  id!: string;
  email!: string;
  name!: string;
}

export class LoginRequest {
  @ApiProperty({
    example: "user@example.com",
    description: "ログイン用メールアドレス",
  })
  @IsEmail()
  @MaxLength(USER_CONSTANTS.MAX_EMAIL_LENGTH)
  @Matches(USER_VALIDATION_PATTERNS.EMAIL)
  email!: string;

  @ApiProperty({
    example: "password123",
    description: "ログイン用パスワード（8文字以上）",
  })
  @IsString()
  @MinLength(AUTH_CONSTANTS.MIN_PASSWORD_LENGTH)
  @MaxLength(AUTH_CONSTANTS.MAX_PASSWORD_LENGTH)
  @Matches(AUTH_VALIDATION_PATTERNS.PASSWORD)
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
