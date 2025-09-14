import { FastifyInstance } from 'fastify';
import autoTag from '~/plugins/auto-tag';
import { auth } from '~/shared/middleware/auth.middleware';
import { authHandlers } from './auth.handler';
import { SignInBody } from './auth.interface';
import { signInSchema } from './auth.schema';

export async function authRouter(fastify: FastifyInstance) {
  await fastify.register(autoTag, { tag: 'Auth' });

  fastify.post<SignInBody>(
    '/sign-in',
    { schema: signInSchema },
    authHandlers.signIn
  );

  fastify.get('/me', { preHandler: auth() }, authHandlers.me);
}
