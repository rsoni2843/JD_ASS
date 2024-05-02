import { CustomerAddressService } from './customer-address.service';
import { CustomerAddress } from 'src/database/entities/customer-address.entity';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { PaginatedResult } from '../utils/types';
import { UtilsService } from '../utils/utils.service';
export declare class CustomerAddressController {
    private readonly customerAddressService;
    private readonly utilsService;
    constructor(customerAddressService: CustomerAddressService, utilsService: UtilsService);
    getAllCustomerAddresses(page: number, size: number, customerId: number): Promise<PaginatedResult<CustomerAddress>>;
    getCustomerAddressById(id: number): Promise<CustomerAddress>;
    createCustomerAddress(customerAddressData: CreateCustomerAddressDto): Promise<CustomerAddress>;
    updateCustomerAddress(id: number, customerAddressData: UpdateCustomerAddressDto): Promise<CustomerAddress>;
    deleteCustomerAddress(id: number): Promise<void>;
}
