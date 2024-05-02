import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpService } from '../otp/otp.service';
import { UtilsService } from './utils.service';
import { Module } from '@nestjs/common';
import { Otp } from 'src/database/entities/otp.entity';
import { User } from 'src/database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/database/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp, Token])],
  controllers: [],
  providers: [UtilsService, OtpService, JwtService],
  exports: [UtilsService],
})
export class UtilsModule {}
