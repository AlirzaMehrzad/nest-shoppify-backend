import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateOrderingDto } from './dto/create-ordering.dto';
import { UpdateOrderingDto } from './dto/update-ordering.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { AddToCartDto } from './dto/addtocart-dto';

@Injectable()
export class OrderingService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}

  addProductToCart = async (req, addToCartDto: AddToCartDto) => {
    const userResult = await this.usersService.findUserByEmail(req.user.email);
    if (!userResult) {
      return { status: 404, message: 'مخاطب پیدا نشد' };
    }
  };

  createOrder = async () => {};

  findAll() {
    return `This action returns all ordering`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordering`;
  }

  update(id: number, updateOrderingDto: UpdateOrderingDto) {
    return `This action updates a #${id} ordering`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordering`;
  }
}
