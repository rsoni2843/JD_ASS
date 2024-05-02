// customer-address.controller.ts

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
import { CustomerAddressService } from './customer-address.service';
import { CustomerAddress } from 'src/database/entities/customer-address.entity';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { ParseQueryPipe } from 'src/pipes/parse-query.pipe';
import { PaginatedResult } from '../utils/types';
import { UtilsService } from '../utils/utils.service';

@Controller('customer-addresses')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
    private readonly utilsService: UtilsService,
  ) {}

  @Get()
  async getAllCustomerAddresses(
    @Query('page', new ParseQueryPipe(1)) page: number,
    @Query('size', new ParseQueryPipe(10)) size: number,
    @Query('customer_id', new ParseQueryPipe()) customerId: number,
  ): Promise<PaginatedResult<CustomerAddress>> {
    const paginationProps = this.utilsService.getPaginationProps(page, size);
    const filterProps = this.customerAddressService.getFilterProps(customerId);
    return this.customerAddressService.findAll(paginationProps, filterProps);
  }

  @Get(':id')
  async getCustomerAddressById(
    @Param('id') id: number,
  ): Promise<CustomerAddress> {
    return this.customerAddressService.findById(id);
  }

  @Post()
  async createCustomerAddress(
    @Body(new ValidationPipe()) customerAddressData: CreateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    return this.customerAddressService.create(customerAddressData);
  }

  @Put(':id')
  async updateCustomerAddress(
    @Param('id') id: number,
    @Body(new ValidationPipe()) customerAddressData: UpdateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    return this.customerAddressService.update(id, customerAddressData);
  }

  @Delete(':id')
  async deleteCustomerAddress(@Param('id') id: number): Promise<void> {
    return this.customerAddressService.delete(id);
  }
}
