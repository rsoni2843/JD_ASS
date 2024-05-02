import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/database/entities/role.entity';
import { PaginatedResult } from '../utils/types';
import { UtilsService } from '../utils/utils.service';
export declare class RoleController {
    private readonly roleService;
    private readonly utilsService;
    constructor(roleService: RoleService, utilsService: UtilsService);
    getAllRoles(page: number, size: number): Promise<PaginatedResult<Role>>;
    getRoleById(id: number): Promise<Role>;
    createRole(roleData: CreateRoleDto): Promise<Role>;
    updateRole(id: number, roleData: UpdateRoleDto): Promise<Role>;
    deleteRole(id: number): Promise<void>;
}
