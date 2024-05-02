// customer-address.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerAddress } from 'src/database/entities/customer-address.entity';
import { Repository } from 'typeorm';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { PaginatedResult } from '../utils/types';
import { PaginationProps } from '../utils/types';
import filterProps from './dto/filterProps';

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectRepository(CustomerAddress)
    private readonly customerAddressRepository: Repository<CustomerAddress>,
  ) {}

  async findAll(
    paginationProps: PaginationProps,
    filterProps: filterProps,
  ): Promise<PaginatedResult<CustomerAddress>> {
    const [data, total] = await this.customerAddressRepository.findAndCount({
      where: filterProps,
      ...paginationProps.filter,
    });

    return { data, total, current_page: paginationProps.currentPage };
  }

  async findById(id: number): Promise<CustomerAddress> {
    const customerAddress = await this.customerAddressRepository.findOne({
      where: { id },
    });

    if (!customerAddress) {
      throw new NotFoundException('Customer address not found');
    }

    return customerAddress;
  }

  async create(
    customerAddressData: CreateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    const newCustomerAddress = this.customerAddressRepository.create({
      ...customerAddressData,
      customer:{id:customerAddressData.customer_id}
    });
    return  this.customerAddressRepository.save(newCustomerAddress);
  }

  async update(
    id: number,
    customerAddressData: UpdateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    let customerAddress = await this.findById(id);

    customerAddress = { ...customerAddress, ...customerAddressData };

    await this.customerAddressRepository.save(customerAddress);

    return customerAddress;
  }

  async delete(id: number): Promise<void> {
    let customerAddress = await this.findById(id);

    await this.customerAddressRepository.remove(customerAddress);
  }

  getFilterProps(customerId: number) {
    const where: filterProps = {};

    if (customerId) {
      where.customer = { id: customerId };
    }

    return where;
  }
}
