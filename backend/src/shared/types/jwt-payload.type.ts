import { UserRole } from './user-role.type';

export interface JwtPayload {
  tid: number;
  userId: number;
  role: UserRole;
  iat: number;
  exp: number;
}
