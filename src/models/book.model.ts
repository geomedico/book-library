import { Type } from '@sinclair/typebox';

import { BookStatus } from './../common/enums/book-status.enum';

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  status: BookStatus;
}

export const BookSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  author: Type.String(),
  year: Type.Integer(),
  status: Type.Enum(BookStatus),
});