import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { GetUserRequest } from "./dto/get-user.dto";
import { User } from "@/types/user.types";
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUser(getUserRequest: GetUserRequest): Promise<User | null> {
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
