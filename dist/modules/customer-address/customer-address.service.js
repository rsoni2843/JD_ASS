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
exports.CustomerAddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_address_entity_1 = require("../../database/entities/customer-address.entity");
const typeorm_2 = require("typeorm");
let CustomerAddressService = class CustomerAddressService {
    constructor(customerAddressRepository) {
        this.customerAddressRepository = customerAddressRepository;
    }
    async findAll(paginationProps, filterProps) {
        const [data, total] = await this.customerAddressRepository.findAndCount(Object.assign({ where: filterProps }, paginationProps.filter));
        return { data, total, current_page: paginationProps.currentPage };
    }
    async findById(id) {
        const customerAddress = await this.customerAddressRepository.findOne({
            where: { id },
        });
        if (!customerAddress) {
            throw new common_1.NotFoundException('Customer address not found');
        }
        return customerAddress;
    }
    async create(customerAddressData) {
        const newCustomerAddress = this.customerAddressRepository.create(Object.assign(Object.assign({}, customerAddressData), { customer: { id: customerAddressData.customer_id } }));
        return this.customerAddressRepository.save(newCustomerAddress);
    }
    async update(id, customerAddressData) {
        let customerAddress = await this.findById(id);
        customerAddress = Object.assign(Object.assign({}, customerAddress), customerAddressData);
        await this.customerAddressRepository.save(customerAddress);
        return customerAddress;
    }
    async delete(id) {
        let customerAddress = await this.findById(id);
        await this.customerAddressRepository.remove(customerAddress);
    }
    getFilterProps(customerId) {
        const where = {};
        if (customerId) {
            where.customer = { id: customerId };
        }
        return where;
    }
};
CustomerAddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_address_entity_1.CustomerAddress)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerAddressService);
exports.CustomerAddressService = CustomerAddressService;
//# sourceMappingURL=customer-address.service.js.map