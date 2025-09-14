import { FastifyRequest } from 'fastify';
import { PaginationParams } from '~/shared/types';

export interface CreateGameDto {
  name: string;
  title: string;
  category: string;
  provider: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
}

export interface CreateGame {
  Body: CreateGameDto;
}

export interface CreateGameReq extends FastifyRequest {
  body: CreateGameDto;
}

export interface GetGameListParams extends PaginationParams {
  q?: string;
}

export interface GetGameListQuery {
  Querystring: GetGameListParams;
}

export interface GetGameListReq extends FastifyRequest {
  query: GetGameListParams;
}

export interface GetGame {
  Params: { id: number };
}

export interface GetGameReq extends FastifyRequest {
  params: { id: number };
}

export interface UpdateGameDto extends CreateGameDto {}

export interface UpdateGame {
  Body: UpdateGameDto;
  Params: { id: number };
}

export interface UpdateGameReq extends FastifyRequest {
  body: UpdateGameDto;
  params: { id: number };
}

export interface DeleteGame {
  Params: { id: number };
}

export interface DeleteGameReq extends FastifyRequest {
  params: { id: number };
}
