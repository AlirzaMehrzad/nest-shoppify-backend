import { Expose, Exclude } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  _id: string;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  age: string;

  @Expose()
  isActive: string;

  @Expose()
  cart: string;

  @Expose()
  favorites: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}
