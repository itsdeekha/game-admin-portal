import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

interface TagOpts {
  tag: string;
}

async function autoTagPlugin(fastify: FastifyInstance, { tag }: TagOpts) {
  fastify.addHook('onRoute', (routeOptions) => {
    if (!routeOptions.schema) routeOptions.schema = {};
    if (!routeOptions.schema.tags) routeOptions.schema.tags = [tag];
  });
}

const autoTag = fp(autoTagPlugin, { name: 'auto-tag' });

export default autoTag;
