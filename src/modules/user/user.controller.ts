// user.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatedResult } from '../utils/types';
import { ParseQueryPipe } from 'src/pipes/parse-query.pipe';
import { UtilsService } from '../utils/utils.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly utilsService: UtilsService,
  ) {}

  @Get('me')
  async getCurrentUser(@Req() request: Request) {
    const token = await this.utilsService.extractJwtFromRequest(request);
    return await this.userService.getCurrentUser(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(
    @Query('page', new ParseQueryPipe(1)) page: number,
    @Query('size', new ParseQueryPipe(10)) size: number,
    @Query('username') username: string,
    @Query('firstname') firstname: string,
    @Query('lastname') lastname: string,
    @Query('email') email: string,
    @Query('mobile') mobile: string,
  ): Promise<PaginatedResult<User>> {
    const paginationProps = this.utilsService.getPaginationProps(page, size);
    const filterProps = this.userService.getFilterProps(
      username,
      firstname,
      lastname,
      email,
      mobile,
    );

    return this.userService.findAll(paginationProps, filterProps);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body(new ValidationPipe()) userData: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<any> {
    await this.userService.delete(id);
    return id;
  }

  @Post(':userId/roles/:roleId')
  async assignRole(
    @Param('userId') userId: number,
    @Param('roleId') roleId: number,
  ): Promise<User> {
    return this.userService.assignRole(userId, roleId);
  }

  @Delete(':userId/roles/:roleId')
  async unassignRole(
    @Param('userId') userId: number,
    @Param('roleId') roleId: number,
  ): Promise<User> {
    return this.userService.unassignRole(userId, roleId);
  }
}
