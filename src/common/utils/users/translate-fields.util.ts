import { fieldNameMap } from './field-translations.util';

export function translateField(field: string): string {
  return fieldNameMap[field] || field;
}
