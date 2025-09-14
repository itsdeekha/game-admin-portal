import { FastifyRequest } from 'fastify';

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInBody {
  Body: SignInDto;
}

export interface SignInReq extends FastifyRequest {
  body: SignInDto;
}
