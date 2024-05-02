import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from './dto/sendOtp.dto';
import { OtpService } from './otp.service';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send-otp')
  async sendOtp(@Body() data: SendEmailDto) {
    return await this.otpService.sendOtp(data.email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() data: VerifyOtpDto) {
    return await this.otpService.verifyOtp(data.otp, data.email);
  }
}
