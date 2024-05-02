import { Role } from 'src/database/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginatedResult, PaginationProps } from '../utils/types';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    findAll(paginationProps: PaginationProps): Promise<PaginatedResult<Role>>;
    findById(id: number): Promise<Role>;
    create(roleData: CreateRoleDto): Promise<Role>;
    update(id: number, roleData: UpdateRoleDto): Promise<Role>;
    delete(id: number): Promise<void>;
}
