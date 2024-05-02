// auth.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

import { JwtPayload } from './dto/jwt-payload.interface';
import { compare } from 'bcrypt';
import { User } from 'src/database/entities/user.entity';
import env from 'src/config/env';
import { Repository } from 'typeorm';
import { Token } from 'src/database/entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);

    if (user && (await compare(password, user.password_hash))) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
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

  async validateToken(token: string): Promise<User> {
    try {
      const payload: JwtPayload = this.jwtService.verify(token, {
        secret: env.jwt.access_token_secret,
      });
      return await this.userService.findById(payload.sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async revokeToken(token: string) {
    const tokenRecord = await this.tokenService.getToken(token);
    if (!tokenRecord) throw new NotFoundException('Token not found!');
    if (tokenRecord) {
      tokenRecord.revoked = true;
      await this.tokenRepository.save(tokenRecord);
    }
    return {
      message: 'User logged out successfully!',
    };
  }
}
