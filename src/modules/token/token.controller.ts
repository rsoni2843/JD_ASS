import { Controller, Get, Req } from '@nestjs/common';
import { TokenService } from './token.service';
import { UtilsService } from '../utils/utils.service';

// @UseGuards(JwtAuthGuard)
@Controller('token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly utilsService: UtilsService,
  ) {}

  @Get()
  async getToken(@Req() request: Request) {
    const token = await this.utilsService.extractJwtFromRequest(request);
    return await this.tokenService.getToken(token);
  }
}
