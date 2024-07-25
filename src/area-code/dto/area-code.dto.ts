import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAreaCodeDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 3)
  code: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateAreaCodeDto extends PartialType(CreateAreaCodeDto) {}
