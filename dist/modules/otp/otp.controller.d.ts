import { SendEmailDto } from './dto/sendOtp.dto';
import { OtpService } from './otp.service';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    sendOtp(data: SendEmailDto): Promise<{
        message: string;
    }>;
    verifyOtp(data: VerifyOtpDto): Promise<{
        accessToken: string;
    }>;
}
