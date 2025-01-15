import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GetUserRequest, User } from "./dto/get-user.dto";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(getUserRequest: GetUserRequest): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id: getUserRequest.id },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("ユーザー情報の取得に失敗しました");
    }
  }
}
