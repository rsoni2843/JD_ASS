// role.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  // UseGuards,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/database/entities/role.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParseQueryPipe } from 'src/pipes/parse-query.pipe';
import { PaginatedResult } from '../utils/types';
import { UtilsService } from '../utils/utils.service';

// @UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly utilsService: UtilsService,
  ) {}

  @Get()
  async getAllRoles(
    @Query('page', new ParseQueryPipe(1)) page: number,
    @Query('size', new ParseQueryPipe(10)) size: number,
  ): Promise<PaginatedResult<Role>> {
    const paginationProps = this.utilsService.getPaginationProps(page, size);

    return this.roleService.findAll(paginationProps);
  }

  @Get(':id')
  async getRoleById(@Param('id') id: number): Promise<Role> {
    return this.roleService.findById(id);
  }

  @Post()
  async createRole(
    @Body(new ValidationPipe()) roleData: CreateRoleDto,
  ): Promise<Role> {
    return this.roleService.create(roleData);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: number,
    @Body(new ValidationPipe()) roleData: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(id, roleData);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<void> {
    return this.roleService.delete(id);
  }
}
