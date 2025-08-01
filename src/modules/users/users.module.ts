import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'src/modules/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
