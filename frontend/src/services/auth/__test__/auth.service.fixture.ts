import { Role, SignInDto, SignInResDto, User } from '~/models/user.model';

export const mockSignInDto: SignInDto = {
  email: 'test@example.com',
  password: 'password123',
};

export const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: Role.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockSignInResponse: SignInResDto = {
  accessToken: 'mock-access-token-123',
  user: mockUser,
};
