// customer.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from 'src/database/entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ParseQueryPipe } from 'src/pipes/parse-query.pipe';
import { UtilsService } from '../utils/utils.service';
import { PaginatedResult } from '../utils/types';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,

    private readonly utilsService: UtilsService,
  ) {}

  @Get()
  async getAllCustomers(
    @Query('page', new ParseQueryPipe(1)) page: number,
    @Query('size', new ParseQueryPipe(10)) size: number,
    @Query('firstname') firstname: string,
    @Query('lastname') lastname: string,
    @Query('email') email: string,
    @Query('mobile') mobile: string,
  ): Promise<PaginatedResult<Customer>> {
    const paginationProps = this.utilsService.getPaginationProps(page, size);
    const filterProps = this.customerService.getFilterProps(
      firstname,
      lastname,
      email,
      mobile,
    );
    return this.customerService.findAll(paginationProps, filterProps);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findById(id);
  }

  @Post()
  async createCustomer(
    @Body(new ValidationPipe()) createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number): Promise<void> {
    return this.customerService.delete(id);
  }
}
