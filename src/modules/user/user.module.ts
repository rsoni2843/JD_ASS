import { User } from 'src/database/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../utils/utils.module';
import { Role } from 'src/database/entities/role.entity';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../token/token.service';
import { Token } from 'src/database/entities/token.entity';
import { UtilsService } from '../utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { Otp } from 'src/database/entities/otp.entity';
import { OtpService } from '../otp/otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Token, Otp]), UtilsModule],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    TokenService,
    UtilsService,
    JwtService,
    OtpService,
  ],
  exports: [UserService],
})
export class UserModule {}
