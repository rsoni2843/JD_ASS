import { UtilsService } from '../utils/utils.service';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { Otp } from 'src/database/entities/otp.entity';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/database/entities/token.entity';
export declare class OtpService {
    private readonly utilsService;
    private readonly jwtService;
    private readonly userRepository;
    private readonly otpRepository;
    private readonly tokenRepository;
    constructor(utilsService: UtilsService, jwtService: JwtService, userRepository: Repository<User>, otpRepository: Repository<Otp>, tokenRepository: Repository<Token>);
    sendOtp(email: string): Promise<{
        message: string;
    }>;
    verifyOtp(otp: string, email: string): Promise<{
        accessToken: string;
    }>;
    private generateRandomNumber;
}
