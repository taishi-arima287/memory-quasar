import { Injectable, NotFoundException } from "@nestjs/common";
import { GetUserRequest, GetUserResponse } from "./dto/user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(getUserRequest: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(getUserRequest);

    if (!user) {
      throw new NotFoundException("ユーザーが存在しません");
    }

    return { user };
  }
}
