import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Types } from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Ensure that the user is authenticated
  async create(@Req() req, @Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.createProduct(
      req,
      createProductDto,
    );
    return {
      success: true,
      message: 'محصول ایجاد شد',
      data: product,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const products = await this.productsService.findAllProducts();
    return {
      status: 200,
      message: 'Products found',
      data: products,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: Types.ObjectId) {
    return this.productsService.findProductById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
