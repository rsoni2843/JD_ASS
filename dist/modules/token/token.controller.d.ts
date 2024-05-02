import { TokenService } from './token.service';
import { UtilsService } from '../utils/utils.service';
export declare class TokenController {
    private readonly tokenService;
    private readonly utilsService;
    constructor(tokenService: TokenService, utilsService: UtilsService);
    getToken(request: Request): Promise<import("../../database/entities/token.entity").Token>;
}
