import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Users } from 'src/modules/users/schema/user.schema';

export type ProductDocument = Products & Document;

@Schema({ timestamps: true })
export class Products {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ length: 250 })
  description: string;

  @Prop([String])
  images: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  owner: Types.ObjectId;

  @Prop({ required: true })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
