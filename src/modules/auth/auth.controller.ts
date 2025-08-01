import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      success: true,
      message: 'ثبت نام باموفقیت انجام شد',
      user,
    };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const { user, jwtToken } = await this.authService.login(loginDto);
    return {
      success: true,
      message: 'لاگین موفق',
      user,
      jwtToken,
    };
  }

  @Get('activate/:token')
  async activate(@Param('token') token: string) {
    await this.authService.userAccountActivation(token);
    return { success: true, message: 'اکانت شما فعال شد' };
  }
}
