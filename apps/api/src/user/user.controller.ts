import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiExtraModels } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { GetUserRequest, GetUserResponse } from "./dto/user.dto";

@ApiTags("users")
@ApiExtraModels(GetUserRequest)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @ApiOperation({ summary: "ユーザー情報取得" })
  @ApiParam({
    name: "id",
    type: String,
    description: "ユーザーID",
    example: "ckv9ydh6s0000gkpj1wybug0x",
  })
  @ApiResponse({
    status: 200,
    description: "ユーザー情報の取得に成功",
    type: GetUserResponse,
  })
  @ApiResponse({ status: 404, description: "ユーザーが存在しない" })
  async getUser(@Param() getUserRequest: GetUserRequest): Promise<GetUserResponse> {
    return this.userService.getUser(getUserRequest);
  }
}
