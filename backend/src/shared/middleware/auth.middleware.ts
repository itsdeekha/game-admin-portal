import { preHandlerHookHandler } from 'fastify';
import { ForbiddenException, UnauthorizedException } from '../exception';
import { JwtPayload, Nullable, UserRole } from '../types';
import { verifyJwt } from '../utils/jwt';

// Extend FastifyRequest to include jwt payload
declare module 'fastify' {
  interface FastifyRequest {
    jwtPayload?: JwtPayload;
  }
}

// Base authentication middleware
export function auth(...roles: Array<UserRole>): preHandlerHookHandler {
  return async (request, _, next) => {
    // Extract token from request header
    const authorization = request.headers.authorization;
    if (!authorization) throw new UnauthorizedException();

    const token = authorization.replace(/^Bearer\s+/, '');
    if (!token) throw new UnauthorizedException();

    let payload: Nullable<JwtPayload>;

    try {
      payload = verifyJwt<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException();
    }

    if (!payload || !payload.userId) {
      throw new UnauthorizedException();
    }

    // Attach jwt payload to request
    request.jwtPayload = payload;

    if (roles.length > 0 && !roles.includes(payload.role)) {
      throw new ForbiddenException();
    }
  };
}
