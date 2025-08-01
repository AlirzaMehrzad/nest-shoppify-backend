import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderingService } from './ordering.service';
import { CreateOrderingDto } from './dto/create-ordering.dto';
import { UpdateOrderingDto } from './dto/update-ordering.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AddToCartDto } from './dto/addtocart-dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('ordering')
export class OrderingController {
  constructor(private readonly orderingService: OrderingService) {}

  @Post('/addtocart')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a product to user cart' })
  addToCart(@Req() req, @Body() addToCartDto: AddToCartDto) {
    return this.orderingService.addProductToCart(req, addToCartDto);
  }

  @Post('/createOrder')
  newOrder() {
    return this.orderingService.createOrder();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderingDto: UpdateOrderingDto,
  ) {
    return this.orderingService.update(+id, updateOrderingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderingService.remove(+id);
  }
}
