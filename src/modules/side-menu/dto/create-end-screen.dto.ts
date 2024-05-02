import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEndScreenDto {
  @IsNotEmpty()
  @IsString()
  form_number: string;

  @IsNotEmpty()
  @IsString()
  form_name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // is_active: boolean;

  // @IsNotEmpty()
  // @IsString()
  // created_by: string;

  // @IsNotEmpty()
  // @IsString()
  // updated_by: string;
}
