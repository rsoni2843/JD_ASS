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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("../../database/entities/customer.entity");
const typeorm_2 = require("typeorm");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async findAll(paginationProps, filterProps) {
        const [data, total] = await this.customerRepository.findAndCount(Object.assign({ where: filterProps }, paginationProps.filter));
        return {
            data,
            total,
            current_page: paginationProps.currentPage,
        };
    }
    async findById(id) {
        const customer = await this.customerRepository.findOne({
            where: { id },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return customer;
    }
    async create(customerData) {
        const newCustomer = this.customerRepository.create(customerData);
        return this.customerRepository.save(newCustomer);
    }
    async update(id, customerData) {
        const customer = await this.findById(id);
        const updatedCustomer = Object.assign(Object.assign({}, customer), customerData);
        return this.customerRepository.save(updatedCustomer);
    }
    async delete(id) {
        const customer = await this.findById(id);
        await this.customerRepository.remove(customer);
    }
    getFilterProps(firstname, lastname, email, mobile) {
        const where = {};
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
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map