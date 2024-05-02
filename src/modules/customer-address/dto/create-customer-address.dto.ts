import {
  IsString,
  // IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateCustomerAddressDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  // @IsBoolean()
  // default_billing_address: boolean;

  // @IsBoolean()
  // default_shipping_address: boolean;

  @IsString()
  pincode: string;

  @IsString()
  street: string;

  @IsString()
  mobile: string;

  @IsNumber()
  customer_id: number;
}
