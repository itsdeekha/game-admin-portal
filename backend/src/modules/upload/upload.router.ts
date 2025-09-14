import { FastifyInstance } from 'fastify';
import autoTag from '~/plugins/auto-tag';
import { auth } from '~/shared/middleware/auth.middleware';
import { UserRole } from '~/shared/types';
import { uploadHandlers } from './upload.handler';
import { GenPresignedUrl } from './upload.interface';
import { genPresignedUrlSchema } from './upload.schema';

export async function uploadRouter(fastify: FastifyInstance) {
  await fastify.register(autoTag, { tag: 'Upload' });

  fastify.post<GenPresignedUrl>(
    '/gen-presigned-url',
    {
      schema: genPresignedUrlSchema,
      preHandler: auth(UserRole.SuperAdmin),
    },
    uploadHandlers.genPresignedUrl
  );
}
