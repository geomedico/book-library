import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { HyperbeeBookRepository } from '../infrastructure/db/hyperbee-book.repository.js';

export default fp(
  async (fastify: FastifyInstance) => {
    const bookRepo = new HyperbeeBookRepository();    
    await bookRepo.init();

    fastify.decorate('bookRepo', bookRepo);

    fastify.addHook('onClose', async () => {
      if (typeof bookRepo.close === 'function') {
        await bookRepo.close();
        fastify.log.info('🔒 Hyperbee storage closed.');
      }
    });

    fastify.addHook('onReady', async () => {
      await bookRepo.init();

    });
  },
  {
    name: 'hyperbee',
  },
);
