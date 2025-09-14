import dataSource from '~/infra/database/data-source';
import { Game } from './entities/game.entity';

export const gameRepository = dataSource.getRepository(Game);
