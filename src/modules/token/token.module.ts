import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { Token } from 'src/database/entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { Role } from 'src/database/entities/role.entity';
import { UtilsService } from '../utils/utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token, User, Role])],
  controllers: [TokenController],
  providers: [TokenService, JwtService, UtilsService],
  exports: [TokenService],
})
export class TokenModule {}
