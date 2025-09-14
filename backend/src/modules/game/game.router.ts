import { FastifyInstance } from 'fastify';
import autoTag from '~/plugins/auto-tag';
import { gameHandlers } from './game.handler';
import {
  CreateGame,
  DeleteGame,
  GetGame,
  GetGameListQuery,
  UpdateGame,
} from './game.interface';
import {
  createGameSchema,
  deleteGameSchema,
  getGameListSchema,
  updateGameSchema,
} from './game.schema';
import { auth } from '~/shared/middleware/auth.middleware';
import { UserRole } from '~/shared/types';

export async function gameRouter(fastify: FastifyInstance) {
  await fastify.register(autoTag, { tag: 'Game' });

  fastify.post<CreateGame>(
    '/',
    {
      schema: createGameSchema,
      preHandler: auth(UserRole.SuperAdmin),
    },
    gameHandlers.create
  );

  fastify.get<GetGameListQuery>(
    '/',
    {
      schema: getGameListSchema,
    },
    gameHandlers.get
  );

  fastify.get<GetGame>(
    '/:id',
    {
      schema: getGameListSchema,
    },
    gameHandlers.getOne
  );

  fastify.put<UpdateGame>(
    '/:id',
    {
      schema: updateGameSchema,
      preHandler: auth(UserRole.SuperAdmin),
    },
    gameHandlers.update
  );

  fastify.delete<DeleteGame>(
    '/:id',
    {
      schema: deleteGameSchema,
      preHandler: auth(UserRole.SuperAdmin),
    },
    gameHandlers.delete
  );
}
