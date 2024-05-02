"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const env_1 = require("../../config/env");
const role_entity_1 = require("../../database/entities/role.entity");
const token_entity_1 = require("../../database/entities/token.entity");
let UserService = class UserService {
    constructor(userRepository, roleRepository, tokenRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.tokenRepository = tokenRepository;
    }
    async findAll(paginationProps, filterProps) {
        const [data, total] = await this.userRepository.findAndCount(Object.assign({ where: filterProps, relations: ['roles'] }, paginationProps.filter));
        return {
            data,
            total,
            current_page: paginationProps.currentPage,
        };
    }
    async findById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['roles'],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOneBy({ username });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async create(userData) {
        const existingUser = await this.userRepository.findOne({
            where: [
                { username: userData.username },
                { email: userData.email },
                { mobile: userData.mobile },
            ],
        });
        if (existingUser) {
            throw new common_1.ConflictException('A user with this username,email or mobile already exists');
        }
        const password_hash = await this.getHashedPassword(userData.password);
        const createdUser = this.userRepository.create(Object.assign(Object.assign({}, userData), { password_hash }));
        await this.userRepository.save(createdUser);
        return createdUser;
    }
    async update(id, userData) {
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
                throw new common_1.ConflictException('A user with this username,email or mobile already exists');
            }
        }
        if (userData.password) {
            const password_hash = await this.getHashedPassword(userData.password);
            user.password_hash = password_hash;
        }
        user = Object.assign(Object.assign({}, user), userData);
        await this.userRepository.save(user);
        return user;
    }
    async delete(id) {
        const user = await this.findById(id);
        await this.userRepository.remove(user);
    }
    async assignRole(userId, roleId) {
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
    async unassignRole(userId, roleId) {
        const user = await this.userRepository.findOneOrFail({
            where: { id: userId },
            relations: ['roles'],
        });
        user.roles = user.roles.filter((role) => role.id !== roleId);
        await this.userRepository.save(user);
        return user;
    }
    async getHashedPassword(password) {
        const saltRounds = env_1.default.passwords.salt;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    getFilterProps(username, firstname, lastname, email, mobile) {
        const where = {};
        if (username)
            where.username = (0, typeorm_2.ILike)(`%${username}%`);
        if (firstname)
            where.firstname = (0, typeorm_2.ILike)(`%${firstname}%`);
        if (lastname)
            where.lastname = (0, typeorm_2.ILike)(`%${lastname}%`);
        if (email)
            where.email = email;
        if (mobile)
            where.mobile = mobile;
        return where;
    }
    async getCurrentUser(token) {
        const tokenRow = await this.tokenRepository.findOne({
            where: { token: token, revoked: false },
            relations: ['user'],
        });
        if (!tokenRow) {
            throw new common_1.NotFoundException('No user found!');
        }
        return tokenRow === null || tokenRow === void 0 ? void 0 : tokenRow.user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map