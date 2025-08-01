import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MaxLength(25)
  @ApiProperty({ example: 'Alireza' })
  firstname: string;

  @IsOptional()
  @MaxLength(25)
  @ApiProperty({ example: 'Mehrzad' })
  lastname: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'alireza@gmail.com' })
  email: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 28 })
  age: number;

  @IsString()
  @ApiProperty({ example: '09160464001' })
  phone: string;
}
