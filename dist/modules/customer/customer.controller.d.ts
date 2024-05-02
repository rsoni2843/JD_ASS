import { CustomerService } from './customer.service';
import { Customer } from 'src/database/entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UtilsService } from '../utils/utils.service';
import { PaginatedResult } from '../utils/types';
export declare class CustomerController {
    private readonly customerService;
    private readonly utilsService;
    constructor(customerService: CustomerService, utilsService: UtilsService);
    getAllCustomers(page: number, size: number, firstname: string, lastname: string, email: string, mobile: string): Promise<PaginatedResult<Customer>>;
    getCustomerById(id: number): Promise<Customer>;
    createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    deleteCustomer(id: number): Promise<void>;
}
