import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class GetCommentsDto {
  @IsOptional()
  @IsMongoId()
  readonly productId?: string;

  @IsNotEmpty()
  readonly userId?: Types.ObjectId;
}
