import fastify, { FastifyInstance } from 'fastify';
import { routes } from './routes';

import swagger from './plugins/swagger';
import cors from './plugins/cors';

export async function createServer(): Promise<FastifyInstance> {
  const server = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  });

  await server.register(swagger);
  await cors(server);
  await routes(server);

  return server;
}
