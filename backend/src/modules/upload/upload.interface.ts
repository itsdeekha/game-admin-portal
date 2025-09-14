import { FastifyRequest } from 'fastify';

export interface GenPresignedUrlDto {
  filename: string;
  mimetype: string;
  filesize: number;
}

export interface GenPresignedUrl {
  Body: GenPresignedUrlDto;
}

export interface GenPresignedUrlReq extends FastifyRequest {
  body: GenPresignedUrlDto;
}

export interface GenPresignedUrlResDto {
  uploadUrl: string;
  fileUrl: string;
  fields: Record<string, string>;
}
