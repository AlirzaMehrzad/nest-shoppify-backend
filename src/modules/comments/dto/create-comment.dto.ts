import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  readonly text: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly userRef: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  readonly productRef: Types.ObjectId;
}
