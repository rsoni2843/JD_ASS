import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatedResult, PaginationProps } from '../utils/types';
import { Role } from 'src/database/entities/role.entity';
import filterProps from './dto/filterProps';
import { Token } from 'src/database/entities/token.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly roleRepository;
    private readonly tokenRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>, tokenRepository: Repository<Token>);
    findAll(paginationProps: PaginationProps, filterProps: filterProps): Promise<PaginatedResult<User>>;
    findById(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    create(userData: CreateUserDto): Promise<User>;
    update(id: number, userData: UpdateUserDto): Promise<User>;
    delete(id: number): Promise<void>;
    assignRole(userId: number, roleId: number): Promise<User>;
    unassignRole(userId: number, roleId: number): Promise<User>;
    private getHashedPassword;
    getFilterProps(username: string, firstname: string, lastname: string, email: string, mobile: string): filterProps;
    getCurrentUser(token: string): Promise<User>;
}
