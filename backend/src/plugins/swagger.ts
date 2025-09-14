import fSwagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import * as Package from '../../package.json';

async function swaggerPlugin(fastify: FastifyInstance) {
  await fastify.register(fSwagger, {
    openapi: {
      info: {
        title: 'API Documentation',
        version: Package.version,
        description: 'API Documentation',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  });

  fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    uiHooks: {
      onRequest: function (_, __, next) {
        next();
      },
      preHandler: function (_, __, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _, __) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
}

const swagger = fp(swaggerPlugin, { name: 'swagger' });

export default swagger;
