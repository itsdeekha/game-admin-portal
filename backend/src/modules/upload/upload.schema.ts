import { FastifySchema } from 'fastify';

export const genPresignedUrlSchema: FastifySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['filename', 'mimetype', 'filesize'],
    properties: {
      filename: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
        pattern:
          '^[^<>:"/\\|?*\x00-\x1f]+\\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg)$',
      },
      mimetype: {
        type: 'string',
        enum: [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
      },
      filesize: {
        type: 'number',
        minimum: 1,
        maximum: 5 * 1024 * 1024, // 5MB
      },
    },
  },
};
