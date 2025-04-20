import { Type } from '@sinclair/typebox';

export const deleteBookSchema = {
  params: Type.Object({
    id: Type.String({ minLength: 1 }),
  }),
};;
