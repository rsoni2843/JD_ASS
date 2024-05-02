import { Token } from 'src/database/entities/token.entity';
import { Repository } from 'typeorm';
export declare class TokenService {
    private readonly tokenRepository;
    constructor(tokenRepository: Repository<Token>);
    getToken(token: string): Promise<Token>;
}
