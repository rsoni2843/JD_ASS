import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class JwtAuthGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.utilsService.extractJwtFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const user = await this.authService.validateToken(token);
      request.user = user; // Attach the user object to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
