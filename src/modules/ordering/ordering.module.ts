import { forwardRef, Module } from '@nestjs/common';
import { OrderingService } from './ordering.service';
import { OrderingController } from './ordering.controller';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => ProductsModule)],
  controllers: [OrderingController],
  providers: [OrderingService],
})
export class OrderingModule {}
