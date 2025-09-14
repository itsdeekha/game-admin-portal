import { FastifySchema } from 'fastify';

export const createGameSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: [
      'name',
      'title',
      'category',
      'provider',
      'description',
      'imageUrl',
      'gameUrl',
    ],
    properties: {
      name: {
        type: 'string',
        maxLength: 255,
      },
      title: {
        type: 'string',
        maxLength: 255,
      },
      category: {
        type: 'string',
        maxLength: 255,
      },
      provider: {
        type: 'string',
        maxLength: 255,
      },
      description: {
        type: 'string',
        maxLength: 255,
      },
      imageUrl: {
        type: 'string',
        format: 'url',
        maxLength: 500,
      },
      gameUrl: {
        type: 'string',
        format: 'url',
        maxLength: 500,
      },
    },
  },
};

export const getGameListSchema: FastifySchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {
      q: {
        type: ['string', 'null'],
      },
      page: {
        type: ['string', 'null'],
      },
      size: {
        type: ['string', 'null'],
      },
    },
  },
};

export const updateGameSchema: FastifySchema = {
  ...createGameSchema,
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
    },
  },
};

export const deleteGameSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
    },
  },
};
