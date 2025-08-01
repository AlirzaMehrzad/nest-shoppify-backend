import { Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './common/logs/logger.middleware';
import { OrderingModule } from './modules/ordering/ordering.module';
import { CommentsModule } from './modules/comments/comments.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all_exception.filter';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    OrderingModule,
    CommentsModule,
    MongooseModule.forRoot(
      'mongodb://admin:secret@localhost:27017/nestlearning?authSource=admin',
    ),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // Additional configuration can be added here if needed
  }
}
