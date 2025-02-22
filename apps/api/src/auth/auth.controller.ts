import { Controller, Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequest, LoginResponse } from "./dto/login.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";

type LoginPublicResponse = LoginResponse;

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "ログイン" })
  @ApiResponse({
    status: 200,
    description: "ログイン成功",
    type: LoginResponse,
  })
  @ApiResponse({ status: 401, description: "認証失敗" })
  async login(
    @Body() loginRequest: LoginRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginPublicResponse> {
    const result = await this.authService.login(loginRequest);

    response.cookie("access_token", result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { user: result.user, access_token: result.access_token };
  }
}
