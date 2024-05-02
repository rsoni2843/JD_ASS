import { Customer } from 'src/database/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginatedResult, PaginationProps } from '../utils/types';
import filterProps from './dto/filterProps';
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<Customer>);
    findAll(paginationProps: PaginationProps, filterProps: filterProps): Promise<PaginatedResult<Customer>>;
    findById(id: number): Promise<Customer>;
    create(customerData: CreateCustomerDto): Promise<Customer>;
    update(id: number, customerData: UpdateCustomerDto): Promise<Customer>;
    delete(id: number): Promise<void>;
    getFilterProps(firstname: string, lastname: string, email: string, mobile: string): filterProps;
}
