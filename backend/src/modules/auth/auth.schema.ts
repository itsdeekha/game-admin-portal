import { FastifySchema } from 'fastify';

export const signUpSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['firstName', 'lastName', 'email', 'password'],
    properties: {
      firstName: {
        type: 'string',
        minLength: 2,
        maxLength: 255,
      },
      lastName: {
        type: 'string',
        minLength: 2,
        maxLength: 255,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 255,
      },
    },
  },
};

export const signInSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 255,
      },
    },
  },
};
