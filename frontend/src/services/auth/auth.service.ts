import { SignInDto, SignInResDto, User } from '~/models/user.model';
import http from '../http';

export async function signIn(dto: SignInDto): Promise<SignInResDto> {
  return http.post(`/api/v1/auth/sign-in`, dto);
}

export async function getProfile(): Promise<User> {
  return http.get<User, Promise<User>>(`/api/v1/auth/me`);
}
