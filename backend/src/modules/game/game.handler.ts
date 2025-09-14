import { NotFoundException } from '~/shared/exception';
import {
  CreateGameReq,
  DeleteGameReq,
  GetGameListReq,
  GetGameReq,
  UpdateGameReq,
} from './game.interface';
import { gameService } from './game.service';
import { Game } from './entities/game.entity';

export const gameHandlers = {
  async create(req: CreateGameReq) {
    return gameService.create(req.body);
  },

  async get(req: GetGameListReq) {
    return gameService.get(req.query);
  },

  async getOne(req: GetGameReq): Promise<Game> {
    const game = await gameService.findOneById(req.params.id);

    if (!game) throw new NotFoundException('game', req.params.id);

    return game;
  },

  async update(req: UpdateGameReq) {
    return gameService.update(req.params.id, req.body);
  },

  async delete(req: DeleteGameReq) {
    return gameService.delete(req.params.id);
  },
};
