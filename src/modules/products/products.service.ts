import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, Products } from './schema/product.schema';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<ProductDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  createProduct = async (req, createProductDto: CreateProductDto) => {
    const user = await this.usersService.findUserByEmail(req.user.email);
    const product = await this.productModel.create({
      ...createProductDto,
      owner: user?._id,
    });
    if (!product)
      throw new HttpException('مشکلی در ایجاد محصول بهوجود آمد', 400);

    return product;
  };

  findAllProducts = async (query) => {
    const prodcuts = await this.productModel
      .find()
      .sort({ createdAt: -1 })
      .skip((query.page - 1) * query.limit)
      .limit(query.limit ? parseInt(query.limit) : 10);

    return prodcuts;
  };

  findProductById = async (id: Types.ObjectId) => {
    const product = await this.productModel.findById(id);
    if (!product) return { status: 400, message: 'No product found' };
    return {
      status: 200,
      message: 'Product found',
      data: product,
    };
  };

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  removeProduct = async (req, id) => {
    const user = await this.usersService.findUserByEmail(req.user.email);
    const product = await this.productModel.findOneAndUpdate(
      {
        _id: id,
        owner: user?._id,
        'deleted.status': { $ne: true },
      },
      {
        $set: {
          'deleted.status': true,
          'deleted.deletedAt': new Date(),
          'deleted.deletedBy': user?._id,
        },
      },
      { new: true },
    );

    if (!product) return false;

    return true;
  };
}
