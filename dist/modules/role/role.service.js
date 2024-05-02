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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("../../database/entities/role.entity");
const typeorm_2 = require("typeorm");
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async findAll(paginationProps) {
        const [data, total] = await this.roleRepository.findAndCount(Object.assign({}, paginationProps.filter));
        return {
            data,
            total,
            current_page: paginationProps.currentPage,
        };
    }
    async findById(id) {
        const role = await this.roleRepository.findOneBy({ id });
        if (!role)
            throw new common_1.NotFoundException('unable to find role');
        return role;
    }
    async create(roleData) {
        const existingRole = await this.roleRepository.findOne({
            where: {
                role_name: roleData.role_name.toLowerCase(),
            },
        });
        if (existingRole)
            throw new common_1.ConflictException('a role with this name already exist');
        const createdRole = this.roleRepository.create(roleData);
        await this.roleRepository.save(createdRole);
        return createdRole;
    }
    async update(id, roleData) {
        let role = await this.findById(id);
        role = Object.assign(Object.assign({}, role), roleData);
        await this.roleRepository.save(role);
        return role;
    }
    async delete(id) {
        let role = await this.findById(id);
        await this.roleRepository.remove(role);
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map