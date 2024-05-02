// role.service.ts

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginatedResult, PaginationProps } from '../utils/types';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(
    paginationProps: PaginationProps,
  ): Promise<PaginatedResult<Role>> {
    const [data, total] = await this.roleRepository.findAndCount({
      ...paginationProps.filter,
    });

    return {
      data,
      total,
      current_page: paginationProps.currentPage,
    };
  }

  async findById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });

    if (!role) throw new NotFoundException('unable to find role');

    return role;
  }

  async create(roleData: CreateRoleDto): Promise<Role> {
    //checking if a role with this name already exists
    const existingRole = await this.roleRepository.findOne({
      where: {
        role_name: roleData.role_name.toLowerCase(),
      },
    });

    if (existingRole)
      throw new ConflictException('a role with this name already exist');

    const createdRole = this.roleRepository.create(roleData);
    await this.roleRepository.save(createdRole);

    return createdRole;
  }

  async update(id: number, roleData: UpdateRoleDto): Promise<Role> {
    let role = await this.findById(id);

    role = { ...role, ...roleData };

    await this.roleRepository.save(role);

    return role;
  }

  async delete(id: number): Promise<void> {
    let role = await this.findById(id);

    await this.roleRepository.remove(role);
  }
}
