import { FastifyRequest } from 'fastify';
import { SignInReq } from './auth.interface';
import { authService } from './auth.service';

export const authHandlers = {
  async signIn(req: SignInReq) {
    return authService.signIn(req.body);
  },

  async me(req: FastifyRequest) {
    return authService.me(req.jwtPayload!.userId);
  },
};
