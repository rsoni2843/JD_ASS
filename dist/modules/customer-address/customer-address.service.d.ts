import { CustomerAddress } from 'src/database/entities/customer-address.entity';
import { Repository } from 'typeorm';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { PaginatedResult } from '../utils/types';
import { PaginationProps } from '../utils/types';
import filterProps from './dto/filterProps';
export declare class CustomerAddressService {
    private readonly customerAddressRepository;
    constructor(customerAddressRepository: Repository<CustomerAddress>);
    findAll(paginationProps: PaginationProps, filterProps: filterProps): Promise<PaginatedResult<CustomerAddress>>;
    findById(id: number): Promise<CustomerAddress>;
    create(customerAddressData: CreateCustomerAddressDto): Promise<CustomerAddress>;
    update(id: number, customerAddressData: UpdateCustomerAddressDto): Promise<CustomerAddress>;
    delete(id: number): Promise<void>;
    getFilterProps(customerId: number): filterProps;
}
