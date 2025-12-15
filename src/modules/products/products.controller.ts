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
  Query,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Types } from 'mongoose';
import { ParseMongoIdPipe } from 'src/common/utils/parse-mongo-id.pipe';

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
  async findAll(@Query() query) {
    const products = await this.productsService.findAllProducts(query);
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

  @Put('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseMongoIdPipe) id: string, @Req() req) {
    const deleted = await this.productsService.removeProduct(req, id);

    if (!deleted) {
      throw new BadRequestException('حذف محصول با مشکل مواجه شد');
    }

    return { success: true, message: 'محصول با موفقیت حذف شد' };
  }
}
