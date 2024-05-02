import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateEndScreenDto {
  @IsOptional()
  @IsString()
  form_number: string;

  @IsOptional()
  @IsString()
  form_name: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
