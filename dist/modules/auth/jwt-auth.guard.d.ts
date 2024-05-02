import { ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilsService } from '../utils/utils.service';
export declare class JwtAuthGuard {
    private readonly authService;
    private readonly utilsService;
    constructor(authService: AuthService, utilsService: UtilsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
