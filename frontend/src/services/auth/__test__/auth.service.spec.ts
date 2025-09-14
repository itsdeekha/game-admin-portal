import { beforeEach, describe, expect, it, vi } from 'vitest';
import http from '../../http';
import { getProfile, signIn } from '../auth.service';
import {
  mockSignInDto,
  mockSignInResponse,
  mockUser,
} from './auth.service.fixture';

vi.mock('../../http', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signIn', () => {
    it('calls http.post with correct endpoint and data', async () => {
      vi.mocked(http.post).mockResolvedValue(mockSignInResponse);

      const result = await signIn(mockSignInDto);

      expect(http.post).toHaveBeenCalledWith(
        '/api/v1/auth/sign-in',
        mockSignInDto
      );
      expect(result).toEqual(mockSignInResponse);
    });

    it('throws error when http.post fails', async () => {
      const errorMessage = 'Network error';
      vi.mocked(http.post).mockRejectedValue(new Error(errorMessage));

      await expect(signIn(mockSignInDto)).rejects.toThrow(errorMessage);
    });
  });

  describe('getProfile', () => {
    it('calls http.get with correct endpoint and profile data', async () => {
      vi.mocked(http.get).mockResolvedValue(mockUser);

      const result = await getProfile();

      expect(http.get).toHaveBeenCalledWith('/api/v1/auth/me');
      expect(result).toEqual(mockUser);
    });

    it('throws error when unauthorized', async () => {
      const unauthorizedError = {
        message: 'Unauthorized',
        statusCode: 401,
      };

      vi.mocked(http.get).mockRejectedValue(unauthorizedError);

      await expect(getProfile()).rejects.toEqual(unauthorizedError);
    });
  });
});
