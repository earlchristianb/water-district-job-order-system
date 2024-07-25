import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAreaCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
