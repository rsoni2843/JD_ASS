import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  role_name: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active?: boolean;
}
