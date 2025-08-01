import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/modules/users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/modules/users/users.module';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from '../nodemailer/mail.queue';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => NodemailerModule),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET
        ? process.env.JWT_SECRET
        : 'defaultSecretKey',
      signOptions: { expiresIn: '1d' }, // Token expiration time
    }),
    BullModule.registerQueue({
      name: 'mailQueue',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailProcessor],
})
export class AuthModule {}
