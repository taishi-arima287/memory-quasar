import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { AuthModule } from "@/auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [PrismaService, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
