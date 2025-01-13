import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
