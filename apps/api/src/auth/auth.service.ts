import { Injectable } from "@nestjs/common";
import { LoginRequest, LoginOriginResponse } from "./dto/login.dto";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async login(loginRequest: LoginRequest): Promise<LoginOriginResponse> {
    return this.authRepository.findUnique(loginRequest);
  }
}
