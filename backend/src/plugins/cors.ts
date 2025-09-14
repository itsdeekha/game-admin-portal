import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';
import { config } from '~/config';

async function corsPlugin(fastify: FastifyInstance) {
  await fastify.register(cors, {
    origin: config.app.corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}

export default corsPlugin;
