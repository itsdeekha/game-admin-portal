import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Game, UpdateGameDto } from '~/models/game.model';
import http from '../../http';
import {
  createGame,
  deleteGame,
  getGame,
  getGameList,
  updateGame,
} from '../game.service';
import {
  mockCreateGameDto,
  mockGameResDto,
  mockGetGameListParams,
  mockGetGameListResDto,
  mockUpdateGameDto,
} from './game.service.fixture';

vi.mock('../../http', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Game Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createGame', () => {
    it('should call http.post with correct endpoint and data', async () => {
      vi.mocked(http.post).mockResolvedValue(mockGameResDto);

      const result = await createGame(mockCreateGameDto);

      expect(http.post).toHaveBeenCalledWith(
        '/api/v1/games',
        mockCreateGameDto
      );
      expect(http.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockGameResDto);
    });

    it('should handle errors when creating game fails', async () => {
      const error = new Error('Network error');

      vi.mocked(http.post).mockRejectedValue(error);
      await expect(createGame(mockCreateGameDto)).rejects.toThrow(error);
    });
  });

  describe('getGameList', () => {
    it('should call http.get with correct endpoint and params', async () => {
      vi.mocked(http.get).mockResolvedValue(mockGetGameListResDto);

      const result = await getGameList(mockGetGameListParams);

      expect(http.get).toHaveBeenCalledWith('/api/v1/games', {
        params: mockGetGameListParams,
      });
      expect(http.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockGetGameListResDto);
    });

    it('should handle errors when getting game list fails', async () => {
      const error = new Error('Server error');
      vi.mocked(http.get).mockRejectedValue(error);

      await expect(getGameList(mockGetGameListParams)).rejects.toThrow(
        'Server error'
      );
      expect(http.get).toHaveBeenCalledWith('/api/v1/games', {
        params: mockGetGameListParams,
      });
    });
  });

  describe('getGame', () => {
    it('should call http.get with correct endpoint and game id', async () => {
      const gameId = 1;

      vi.mocked(http.get).mockResolvedValue(mockGameResDto);

      const result = await getGame(gameId);

      expect(http.get).toHaveBeenCalledWith(`/api/v1/games/${gameId}`);
      expect(http.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockGameResDto);
    });

    it('should handle errors when game is not found', async () => {
      const gameId = 999;
      const error = new Error('Game not found');

      vi.mocked(http.get).mockRejectedValue(error);

      await expect(getGame(gameId)).rejects.toThrow('Game not found');
      expect(http.get).toHaveBeenCalledWith(`/api/v1/games/${gameId}`);
    });
  });

  describe('updateGame', () => {
    it('should call http.put with correct endpoint and data', async () => {
      const expectedGame: Game = {
        ...mockUpdateGameDto,
        name: 'Updated Game',
        description: 'An updated game',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(http.put).mockResolvedValue(expectedGame);

      const result = await updateGame(mockUpdateGameDto);
      const { id, ...body } = mockUpdateGameDto;

      expect(http.put).toHaveBeenCalledWith(`/api/v1/games/${id}`, body);
      expect(http.put).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedGame);
    });

    it('should exclude id from request body', async () => {
      const updateGameDto: UpdateGameDto = {
        ...mockUpdateGameDto,
        name: 'Game with ID',
        description: 'An updated game',
      };
      const expectedGame: Game = {
        ...updateGameDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(http.get).mockResolvedValue(expectedGame);

      await updateGame(updateGameDto);

      const { id, ...body } = updateGameDto;

      expect(http.put).toHaveBeenCalledWith(`/api/v1/games/${id}`, body);
      expect(http.put).toHaveBeenCalledWith(
        `/api/v1/games/${id}`,
        expect.not.objectContaining({ id: expect.any(Number) })
      );
    });

    it('should handle errors when updating game fails', async () => {
      const error = new Error('Validation error');

      vi.mocked(http.put).mockRejectedValue(error);
      await expect(updateGame(mockUpdateGameDto)).rejects.toThrow(error);
    });
  });

  describe('deleteGame', () => {
    it('should call http.delete with correct endpoint and game id', async () => {
      const { id } = mockGameResDto;
      vi.mocked(http.delete).mockResolvedValue(undefined);

      const result = await deleteGame(id);

      expect(http.delete).toHaveBeenCalledWith(`/api/v1/games/${id}`);
      expect(http.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });
});
