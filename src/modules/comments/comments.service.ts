import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UsersService } from '../users/users.service';
import { CommentDocument, Comments } from './schema/comment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentModel: Model<CommentDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  createComment = async (createCommentDto: CreateCommentDto) => {
    const comment = await this.commentModel.create(createCommentDto);
    if (!comment)
      return { success: false, status: 400, message: 'دیدگاه شما ایجاد نشد' };

    return {
      success: true,
      status: 200,
      message: 'دیدگاه شما ایجاد شد و در انتظار تایید است',
    };
  };

  findAllComments = async (getCommentsDto) => {
    const allUserComments = await this.commentModel.find({
      userRef: getCommentsDto.userId,
    });
    const allProductComments = await this.commentModel.find({
      userRef: getCommentsDto.productId,
    });
    return {
      success: true,
      message: 'کامنت ها پیدا شد',
      allUserComments,
      allProductComments,
    };
  };

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
