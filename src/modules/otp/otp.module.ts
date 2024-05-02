import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from 'src/database/entities/otp.entity';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { UtilsService } from '../utils/utils.service';
import { User } from 'src/database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/database/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Otp, User, Token])],
  controllers: [OtpController],
  providers: [OtpService, UtilsService, JwtService],
})
export class OtpModule {}
