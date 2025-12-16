import { PipeTransform, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isMongoId(value)) {
      throw new BadRequestException('شناسه محصول معتبر نمیباشد');
    }
    return value;
  }
}
