import { Type } from '@sinclair/typebox';
import { BookStatus } from './../common/enums/book-status.enum';

export const updateBookStatusSchema = {
  params: Type.Object({
    id: Type.String({ minLength: 1 }),
  }),
  body: Type.Object({
    status: Type.Union([
      Type.Literal(BookStatus.AVAILABLE),
      Type.Literal(BookStatus.READING),
      Type.Literal(BookStatus.FINISHED),
    ]),
  }),
};
