import { Type } from '@sinclair/typebox';

import { BookStatus } from './../common/enums/book-status.enum';
import { BookSchema } from './../models/book.model'


export const getBooksQuerySchema = {
  querystring: Type.Object({
    status: Type.Optional(Type.Enum(BookStatus)),
    author: Type.Optional(Type.String()),
    page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 10 })),
    sortBy: Type.Optional(
      Type.Union([
        Type.Literal('title'),
        Type.Literal('author'),
        Type.Literal('year'),
        Type.Literal('status'),
      ], { default: 'title' })
    ),
    sortOrder: Type.Optional(
      Type.Union([
        Type.Literal('asc'),
        Type.Literal('desc'),
      ], { default: 'asc' })
    ),
  }, { additionalProperties: false }),
  response: {
    200: Type.Object({
      data: Type.Array(BookSchema),
      meta: Type.Object({
        total: Type.Integer(),
        page: Type.Integer(),
        limit: Type.Integer(),
      }),
    }),
  },
};