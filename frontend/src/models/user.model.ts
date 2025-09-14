import { BaseModel } from './base.model';

export enum Role {
  SuperAdmin = 'super_admin',
  RegularAdmin = 'regular_admin',
  User = 'user',
}

export interface User extends BaseModel {
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInResDto {
  accessToken: string;
  user: User;
}
