import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/database/entities/token.entity';
import { User } from 'src/database/entities/user.entity';
import { TokenService } from '../token/token.service';
import { UtilsService } from '../utils/utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token, User]), UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtAuthGuard,
    TokenService,
    UtilsService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
