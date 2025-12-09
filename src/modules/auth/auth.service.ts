import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import {
  activationEmailTemplate,
  loginEmailTemplate,
} from '../nodemailer/mail.templates';

@Injectable()
export class AuthService {
  constructor(
    // Inject any required services here
    @InjectQueue('mailQueue') private mailQueue: Queue,
    @InjectModel(Users.name) private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  register = async (registerDto: RegisterDto) => {
    const user = await this.usersService.findUserByPhoneAndEmail(
      registerDto.email,
      registerDto.phone,
    );
    if (user) {
      throw new HttpException('ایمیل یا تلفن قبلا ثبت شده', 400);
    }

    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.usersService.createUser(registerDto);

    const activationLink = await this.generateActivationToken(registerDto);

    // enqueue email to be sent in background
    await this.mailQueue.add('sendMail', {
      to: registerDto.email,
      subject: 'لینک فعالسازی حساب‌کاربری',
      html: activationEmailTemplate(activationLink),
    });

    return newUser;
  };

  login = async (loginDto: LoginDto) => {
    const user = await this.usersService.findUserByEmail(loginDto.email);
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user?.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('پسورد یا ایمیل اشتباه است', 400);
    }

    const jwtToken = this.jwtService.sign({
      email: user?.email,
    });

    // send login email
    await this.mailQueue.add('sendMail', {
      to: loginDto.email,
      subject: 'ورود جدید به حساب شما!',
      html: loginEmailTemplate(loginDto.email),
    });

    return {
      user,
      jwtToken,
    };
  };

  userAccountActivation = async (token: string) => {
    const user = await this.userModel.findOne({
      activationExpires: { $gt: new Date() }, // not expired
    });
    if (!user) throw new BadRequestException('لینک منقضی شده یا نامعتبر است');

    const isMatch = await bcrypt.compare(token, user.activationToken);
    if (!isMatch) throw new BadRequestException('لینک نامعتبر است');

    user.isActive = true;
    user.activationToken = undefined;
    user.activationExpires = undefined;
    await user.save();

    return true;
  };

  generateActivationToken = async (registerDto: RegisterDto) => {
    const rawToken = crypto.randomBytes(32).toString('hex'); // 64-char token
    const hashedToken = await bcrypt.hash(rawToken, 10);

    await this.userModel.updateOne(
      { email: registerDto.email },
      {
        activationToken: hashedToken,
        activationExpires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      },
    );

    return `http://localhost:3000/auth/activate/${rawToken}`;
  };
}
