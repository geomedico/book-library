import { FastifyRequest, FastifyReply } from 'fastify';
import { Book } from './../models/book.model';
import { BookService } from './../services/book.service';
import { BookStatus } from './../common/enums/book-status.enum';

export const bookController = (bookService: BookService) => ({
  create: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const body = req.body as Book;
    const book = await bookService.create(body);
    reply.code(201).send(book);
  },

  list: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const {
      status,
      author,
      page = 1,
      limit = 10,
      sortBy = 'title',
      sortOrder = 'asc',
    } = req.query as {
      status?: BookStatus;
      author?: string;
      page?: number;
      limit?: number;
      sortBy?: keyof Book;
      sortOrder?: 'asc' | 'desc';
    };

    const result = await bookService.getAll(
      { status, author },
      { page, limit, sortBy, sortOrder },
    );

    reply.send({
      data: result.data,
      meta: {
        total: result.total,
        page,
        limit,
      },
    });
  },

  updateStatus: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { id } = req.params as { id: string };
    const { status } = req.body as { status: BookStatus };
    const success = await bookService.updateStatus(id, status);
    reply.code(success ? 200 : 404).send({ success });
  },

  remove: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { id } = req.params as { id: string };
    const success = await bookService.delete(id);
    reply.code(success ? 200 : 404).send({ success });
  },
});
