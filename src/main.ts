import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all_exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My nestjs application')
    .setDescription('shoppify applciation created by nestjs')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ⛔️ فقط فیلدهای تعریف‌شده را قبول کن
      forbidNonWhitelisted: true, // ⛔️ اگر فیلد اضافی بود، خطا بده
      transform: true, // ✅ تبدیل به کلاس مورد نظر (optional ولی مفید)
    }),
  );
  app.use(
    session({
      secret: 'secret',
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
