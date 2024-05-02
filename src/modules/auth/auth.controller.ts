import { UtilsService } from './../utils/utils.service';
// auth.controller.ts

import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Get('logout')
  async logout(@Req() request: Request) {
    const token = await this.utilsService.extractJwtFromRequest(request);
    return await this.authService.revokeToken(token);
  }
}
