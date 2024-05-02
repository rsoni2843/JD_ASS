import {
  IsString,
  //  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateCustomerAddressDto {
  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  // @IsOptional()
  // @IsBoolean()
  // default_billing_address?: boolean;

  // @IsOptional()
  // @IsBoolean()
  // default_shipping_address?: boolean;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  mobile?: string;
}
