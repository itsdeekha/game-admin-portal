import { FastifyInstance } from 'fastify';
import { authRouter } from './modules/auth/auth.router';
import { gameRouter } from './modules/game/game.router';
import { uploadRouter } from './modules/upload/upload.router';

export async function routes(fastify: FastifyInstance) {
  await fastify.register(authRouter, { prefix: '/api/v1/auth' });
  await fastify.register(gameRouter, { prefix: '/api/v1/games' });
  await fastify.register(uploadRouter, { prefix: '/api/v1/upload' });
  fastify.get('/ping', (_, reply) => reply.send('Pong'));
  fastify.get('/', (_, reply) => reply.redirect('/docs'));
}
