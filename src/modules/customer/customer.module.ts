import { Customer } from 'src/database/entities/customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UtilsModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
