import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { ActionType, Otp, OtpType } from 'src/database/entities/otp.entity';
import { JwtPayload } from '../auth/dto/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/database/entities/token.entity';
import env from 'src/config/env';

@Injectable()
export class OtpService {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async sendOtp(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const otp = this.generateRandomNumber();
    const sentMail = await this.utilsService.sendEmail(
      email,
      `Otp for  ${user.firstname}`,
      otp,
    );
    if (sentMail) {
      const newOtp = await this.otpRepository.create({
        type: OtpType.EMAIL,
        action_type: ActionType.LOGIN,
        code: otp,
        value: email,
      });
      await this.otpRepository.save(newOtp);
    }
    return {
      message: 'OTP Send Successfully!',
    };
  }

  async verifyOtp(otp: string, email: string) {
    const otpRecord = await this.otpRepository.findOne({
      where: { value: email },
      order: { createdAt: 'DESC' },
    });
    if (!otpRecord) {
      throw new BadRequestException('No OTP record!');
    }
    if (+otp !== +otpRecord.code) {
      throw new BadRequestException('Invalid OTP!');
    }

    const currentTime = new Date();
    const otpCreationTime = otpRecord.createdAt;
    const timeDifference =
      (currentTime.getTime() - otpCreationTime.getTime()) / (1000 * 60); // Difference in minutes

    if (timeDifference > 5) {
      throw new BadRequestException('OTP has expired!');
    }

    await this.otpRepository.delete(otpRecord.id);

    const user = await this.userRepository.findOne({ where: { email } });

    const payload: JwtPayload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: env.jwt.access_token_secret,
    });

    if (accessToken) {
      const newToken = this.tokenRepository.create({
        token: accessToken,
        user: user,
      });
      this.tokenRepository.save(newToken);
    }

    return {
      accessToken,
    };
  }

  private generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
