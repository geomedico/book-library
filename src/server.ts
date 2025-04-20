import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import staticPlugin from '@fastify/static';
import path from 'path';

import config from './plugins/config';
import routes from './routes/index';
import hyperbeePlugin from './plugins/hyperbee';
import { __dirname } from './common/utils/paths';

const server = fastify({
  ajv: {
    customOptions: {
      removeAdditional: "all",
      coerceTypes: true,
      useDefaults: true,
    }
  },
  logger: {
    level: process.env.LOG_LEVEL,
  },
});

console.log('dir:', __dirname);

await server.register(staticPlugin, {
  root: path.join(__dirname, '../../../docs'),
  prefix: '/docs/',
});

await server.register(swagger, {
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../../../docs/swagger.yaml'),
    baseDir: path.resolve(__dirname, '../../../docs'),
  },
});

await server.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  staticCSP: true,
});


await server.register(config);
await server.register(hyperbeePlugin);

await server.register(routes, { prefix: '/books' });

await server.ready();

export default server;
