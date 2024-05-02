// customer.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/database/entities/customer.entity';
import { ILike, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginatedResult, PaginationProps } from '../utils/types';
import filterProps from './dto/filterProps';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(
    paginationProps: PaginationProps,
    filterProps: filterProps,
  ): Promise<PaginatedResult<Customer>> {
    const [data, total] = await this.customerRepository.findAndCount({
      where: filterProps,
      ...paginationProps.filter,
    });

    return {
      data,
      total,
      current_page: paginationProps.currentPage,
    };
  }

  async findById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async create(customerData: CreateCustomerDto): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customerData);
    return this.customerRepository.save(newCustomer);
  }

  async update(id: number, customerData: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findById(id);
    const updatedCustomer = { ...customer, ...customerData };
    return this.customerRepository.save(updatedCustomer);
  }

  async delete(id: number): Promise<void> {
    const customer = await this.findById(id);
    await this.customerRepository.remove(customer);
  }

  getFilterProps(
    firstname: string,
    lastname: string,
    email: string,
    mobile: string,
  ) {
    const where: filterProps = {};

    if (firstname) where.firstname = ILike(`%${firstname}%`);
    if (lastname) where.lastname = ILike(`%${lastname}%`);
    if (email) where.email = email;
    if (mobile) where.mobile = mobile;

    return where;
  }
}
