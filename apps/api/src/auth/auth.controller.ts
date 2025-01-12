import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'ログイン' })
  @ApiResponse({ status: 200, description: 'ログイン成功' })
  @ApiResponse({ status: 401, description: '認証失敗' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
} 