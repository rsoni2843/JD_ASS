import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/database/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async getToken(token: string) {
    if (!token) throw new NotFoundException('Token not found!');
    const tokenRecord = await this.tokenRepository.findOneBy({ token });
    if (!tokenRecord) throw new NotFoundException('Token not found!');
    return tokenRecord;
  }
}
