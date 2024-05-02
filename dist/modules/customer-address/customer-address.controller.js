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
exports.CustomerAddressController = void 0;
const common_1 = require("@nestjs/common");
const customer_address_service_1 = require("./customer-address.service");
const create_customer_address_dto_1 = require("./dto/create-customer-address.dto");
const update_customer_address_dto_1 = require("./dto/update-customer-address.dto");
const parse_query_pipe_1 = require("../../pipes/parse-query.pipe");
const utils_service_1 = require("../utils/utils.service");
let CustomerAddressController = class CustomerAddressController {
    constructor(customerAddressService, utilsService) {
        this.customerAddressService = customerAddressService;
        this.utilsService = utilsService;
    }
    async getAllCustomerAddresses(page, size, customerId) {
        const paginationProps = this.utilsService.getPaginationProps(page, size);
        const filterProps = this.customerAddressService.getFilterProps(customerId);
        return this.customerAddressService.findAll(paginationProps, filterProps);
    }
    async getCustomerAddressById(id) {
        return this.customerAddressService.findById(id);
    }
    async createCustomerAddress(customerAddressData) {
        return this.customerAddressService.create(customerAddressData);
    }
    async updateCustomerAddress(id, customerAddressData) {
        return this.customerAddressService.update(id, customerAddressData);
    }
    async deleteCustomerAddress(id) {
        return this.customerAddressService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new parse_query_pipe_1.ParseQueryPipe(1))),
    __param(1, (0, common_1.Query)('size', new parse_query_pipe_1.ParseQueryPipe(10))),
    __param(2, (0, common_1.Query)('customer_id', new parse_query_pipe_1.ParseQueryPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "getAllCustomerAddresses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "getCustomerAddressById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_address_dto_1.CreateCustomerAddressDto]),
    __metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "createCustomerAddress", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_customer_address_dto_1.UpdateCustomerAddressDto]),
    __metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "updateCustomerAddress", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerAddressController.prototype, "deleteCustomerAddress", null);
CustomerAddressController = __decorate([
    (0, common_1.Controller)('customer-addresses'),
    __metadata("design:paramtypes", [customer_address_service_1.CustomerAddressService,
        utils_service_1.UtilsService])
], CustomerAddressController);
exports.CustomerAddressController = CustomerAddressController;
//# sourceMappingURL=customer-address.controller.js.map