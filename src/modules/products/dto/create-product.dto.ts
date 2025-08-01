import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(35)
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01, { message: 'قیمت محصول نمیتواند صفر یا کمتر باشد' })
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(250)
  @IsNotEmpty()
  readonly description: string;

  @IsOptional()
  @IsArray()
  readonly images: string[];

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'موجودی نمیتواند کمتر از یک باشد' })
  readonly stock: number;
}
