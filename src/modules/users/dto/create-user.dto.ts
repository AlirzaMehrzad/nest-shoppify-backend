import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @MaxLength(25)
  firstname: string;

  @IsOptional()
  @MaxLength(25)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  password: string;
  age: number;
  phone: string;
}
