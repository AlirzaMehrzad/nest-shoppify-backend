import { BadRequestException } from '@nestjs/common';
import { translateField } from './translate-fields.util';
import { Types } from 'mongoose';

export const checkDuplicateFields = async <T>(
  model: any,
  id: Types.ObjectId,
  dto: Partial<T>,
  fields: (keyof T)[],
): Promise<void> => {
  const conditions = fields
    .filter((field) => dto[field])
    .map((field) => ({ [field]: dto[field] }));

  if (!conditions.length) return;

  const existing = await model.findOne({
    _id: { $ne: id },
    $or: conditions,
  });

  if (existing) {
    for (const field of fields) {
      if (dto[field] && existing[field] === dto[field]) {
        const fieldFa = translateField(field as string);
        throw new BadRequestException(`${fieldFa} قبلاً استفاده شده است`);
      }
    }
  }
};
