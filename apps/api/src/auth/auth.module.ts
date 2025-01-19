import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "24h" },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, AuthRepository],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
