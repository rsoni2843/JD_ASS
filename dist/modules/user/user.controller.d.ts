import { UserService } from './user.service';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatedResult } from '../utils/types';
import { UtilsService } from '../utils/utils.service';
export declare class UserController {
    private readonly userService;
    private readonly utilsService;
    constructor(userService: UserService, utilsService: UtilsService);
    getCurrentUser(request: Request): Promise<User>;
    getAllUsers(page: number, size: number, username: string, firstname: string, lastname: string, email: string, mobile: string): Promise<PaginatedResult<User>>;
    getUserById(id: number): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(id: number, userData: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<any>;
    assignRole(userId: number, roleId: number): Promise<User>;
    unassignRole(userId: number, roleId: number): Promise<User>;
}
