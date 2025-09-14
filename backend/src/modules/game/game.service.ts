import { NotFoundException } from '~/shared/exception';
import { Nullable } from '~/shared/types';
import {
  infinityPagination,
  parsePagination,
} from '~/shared/utils/pagination.util';
import { uploadService } from '../upload/upload.service';
import { Game } from './entities/game.entity';
import {
  CreateGameDto,
  GetGameListParams,
  UpdateGameDto,
} from './game.interface';
import { gameRepository } from './game.repository';

export const gameService = {
  async create(dto: CreateGameDto): Promise<Game> {
    return gameRepository.save(gameRepository.create(dto));
  },

  async get(query: GetGameListParams) {
    const { q } = query;
    const pagination = parsePagination(query);
    const { page, size } = pagination;
    const queryBuilder = gameRepository.createQueryBuilder('game');

    if (q) {
      const searchTerm = `%${q.trim()}%`;
      queryBuilder.where(
        '(game.name ILIKE :searchTerm OR ' +
          'game.title ILIKE :searchTerm OR ' +
          'game.category ILIKE :searchTerm OR ' +
          'game.provider ILIKE :searchTerm)',
        { searchTerm }
      );
    }

    queryBuilder
      .orderBy('game.createdAt', 'DESC')
      .skip((page - 1) * size)
      .take(size);

    const [games, count] = await queryBuilder.getManyAndCount();

    return infinityPagination(games, count, pagination);
  },

  findOneById(id: number): Promise<Nullable<Game>> {
    return gameRepository.findOneBy({ id });
  },

  async update(id: number, dto: UpdateGameDto) {
    return gameRepository.update(id, dto);
  },

  async delete(id: number) {
    const game = await gameRepository.findOneBy({ id });
    if (!game) {
      throw new NotFoundException('game', id);
    }

    if (game.imageUrl) {
      try {
        if (uploadService.isValidS3Url(game.imageUrl)) {
          await uploadService.deleteImageFromS3(game.imageUrl);
        }
      } catch (error) {
        // Log error but don't prevent game deletion
        console.error(`Error deleting image for game ID ${id}:`, error);
      }
    }

    return gameRepository.delete(id);
  },
};
