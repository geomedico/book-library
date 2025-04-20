import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import server from '../../src/server.js';
describe('GET / (Book list endpoint)', () => {
  afterAll(async () => {
    await server.close();
  });

  beforeAll(async () => {
   await server.ready();
  });

  test('should return 200 and a paginated book list', async () => {
    const response = await server.inject({
      method: 'GET',
      path: '/books',
    });

    expect(response.statusCode).toBe(200);

    const payload = response.json();
    expect(payload).toHaveProperty('data');
    expect(payload).toHaveProperty('meta');
    expect(Array.isArray(payload.data)).toBe(true);
    expect(payload.meta).toMatchObject({
      page: 1,
      limit: 10,
    });
  });
});
