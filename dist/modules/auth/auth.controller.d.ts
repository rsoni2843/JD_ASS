import { UtilsService } from './../utils/utils.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly utilsService;
    constructor(authService: AuthService, utilsService: UtilsService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    logout(request: Request): Promise<{
        message: string;
    }>;
}
