import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class AddToCartDto {
  @IsNotEmpty()
  @ApiProperty({ example: '6885d62f63f4c9f3706c6efb' })
  readonly _id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @MaxLength(35)
  @ApiProperty({ example: 'iphone 16 promax 256g' })
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01, { message: 'قیمت محصول نمیتواند صفر یا کمتر باشد' })
  @ApiProperty({ example: 200000000 })
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(250)
  @IsNotEmpty()
  @ApiProperty({ example: 'توضیحات محصول' })
  readonly description: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'آرایه ای از ادرس فایل های محصول' })
  readonly images: string[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  readonly isActive: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 3, description: 'تعداد مایل به خرید' })
  readonly quantity: number;
}
