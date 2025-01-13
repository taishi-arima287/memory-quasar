import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { LoginRequest, LoginOriginResponse } from "./dto/login.dto";

@Injectable()
export class AuthRepository {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findUnique(loginRequest: LoginRequest): Promise<LoginOriginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginRequest.email },
    });

    if (!user) {
      throw new UnauthorizedException("メールアドレスまたはパスワードが正しくありません");
    }

    const isPasswordValid = await compare(loginRequest.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("メールアドレスまたはパスワードが正しくありません");
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
