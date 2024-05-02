import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import env from 'src/config/env';
import { PaginatedResult, PaginationProps } from '../utils/types';
import { Role } from 'src/database/entities/role.entity';
import filterProps from './dto/filterProps';
import { Token } from 'src/database/entities/token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async findAll(
    paginationProps: PaginationProps,
    filterProps: filterProps,
  ): Promise<PaginatedResult<User>> {
    const [data, total] = await this.userRepository.findAndCount({
      where: filterProps,
      relations: ['roles'],
      // order: {
      //   created_at: 'DESC',
      // },
      ...paginationProps.filter,
    });
    return {
      data,
      total,
      current_page: paginationProps.currentPage,
    };
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    // Check if a user with this username or email or mobile already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { username: userData.username },
        { email: userData.email },
        { mobile: userData.mobile },
      ],
    }); // it will result in an OR query checking the above conditions

    if (existingUser) {
      throw new ConflictException(
        'A user with this username,email or mobile already exists',
      );
    }

    const password_hash = await this.getHashedPassword(userData.password);

    const createdUser = this.userRepository.create({
      ...userData,
      password_hash,
    });
    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    let user = await this.findById(id);

    const whereParameters = [];

    if (userData.username !== user.username)
      whereParameters.push({ username: userData.username });
    if (userData.email !== user.email)
      whereParameters.push({ email: userData.email });
    if (userData.mobile !== user.mobile)
      whereParameters.push({ mobile: userData.mobile });

    if (whereParameters.length > 0) {
      const existingUser = await this.userRepository.findOne({
        where: whereParameters,
      });

      if (existingUser) {
        throw new ConflictException(
          'A user with this username,email or mobile already exists',
        );
      }
    }

    if (userData.password) {
      const password_hash = await this.getHashedPassword(userData.password);
      user.password_hash = password_hash;
    }

    user = { ...user, ...userData };

    await this.userRepository.save(user);

    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);

    await this.userRepository.remove(user);
  }

  async assignRole(userId: number, roleId: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['roles'],
    });
    const role = await this.roleRepository.findOneOrFail({
      where: { id: roleId },
    });
    user.roles = [...user.roles, role];
    await this.userRepository.save(user);

    return user;
  }

  async unassignRole(userId: number, roleId: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['roles'],
    });
    user.roles = user.roles.filter((role) => role.id !== roleId);
    await this.userRepository.save(user);

    return user;
  }

  private async getHashedPassword(password: string) {
    const saltRounds = env.passwords.salt;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  getFilterProps(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    mobile: string,
  ) {
    const where: filterProps = {};

    if (username) where.username = ILike(`%${username}%`);
    if (firstname) where.firstname = ILike(`%${firstname}%`);
    if (lastname) where.lastname = ILike(`%${lastname}%`);
    if (email) where.email = email;
    if (mobile) where.mobile = mobile;

    return where;
  }

  async getCurrentUser(token: string) {
    const tokenRow = await this.tokenRepository.findOne({
      where: { token: token, revoked: false },
      relations: ['user'],
    });

    if (!tokenRow) {
      throw new NotFoundException('No user found!');
    }

    return tokenRow?.user;
  }
}
