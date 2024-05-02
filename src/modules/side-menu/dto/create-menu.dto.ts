import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon_location: string;

  @IsOptional()
  @IsNumber()
  parent_id: number;

  @IsNotEmpty()
  @IsNumber()
  end_screen_id: number;
}
