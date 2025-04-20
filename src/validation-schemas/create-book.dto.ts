import { Type } from '@sinclair/typebox';
import { BookStatus } from './../common/enums/book-status.enum';

export const createBookSchema = {
  body: Type.Object({
    title: Type.String({ minLength: 1 }),
    author: Type.String({ minLength: 1 }),
    year: Type.Number({ minimum: 0 }),
    status: Type.Union([
      Type.Literal(BookStatus.AVAILABLE),
      Type.Literal(BookStatus.READING),
      Type.Literal(BookStatus.FINISHED),
    ]),
  }),
};