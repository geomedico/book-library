import { FastifyInstance, FastifyPluginAsync } from 'fastify';

import { bookController } from '../controllers/book.controller.js';
import { BookService } from '../services/book.service.js';
import {
  createBookSchema,
  getBooksQuerySchema,
  updateBookStatusSchema,
  deleteBookSchema
} from '../validation-schemas/index.js';

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = new BookService(fastify.bookRepo);
  const controller = bookController(service);

  fastify.post('/', { schema: createBookSchema }, controller.create);
  fastify.get('/', { schema: getBooksQuerySchema }, controller.list);
  fastify.patch('/:id/status', { schema: updateBookStatusSchema }, controller.updateStatus);
  fastify.delete('/:id', { schema: deleteBookSchema }, controller.remove);

}

export default routes;
