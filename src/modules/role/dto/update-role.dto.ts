import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  role_name?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
