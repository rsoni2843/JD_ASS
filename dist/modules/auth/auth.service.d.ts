import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { Token } from 'src/database/entities/token.entity';
import { TokenService } from '../token/token.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly tokenService;
    private readonly tokenRepository;
    constructor(userService: UserService, jwtService: JwtService, tokenService: TokenService, tokenRepository: Repository<Token>);
    validateUser(username: string, password: string): Promise<User>;
    login(user: User): Promise<{
        accessToken: string;
    }>;
    validateToken(token: string): Promise<User>;
    revokeToken(token: string): Promise<{
        message: string;
    }>;
}
