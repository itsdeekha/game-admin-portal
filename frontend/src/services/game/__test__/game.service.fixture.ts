import { ListRes } from '~/models/common.model';
import {
  CreateGameDto,
  Game,
  GetGameListParams,
  UpdateGameDto,
} from '~/models/game.model';

export const mockCreateGameDto: CreateGameDto = {
  name: 'Candy Crush Saga',
  title: 'Sweet Match-3 Puzzle Adventure',
  category: 'Puzzle',
  provider: 'King Digital Entertainment',
  description:
    'Join Tiffi and Mr. Toffee in their sweet adventure through the Candy Kingdom. Match 3 candies to progress through hundreds of levels in this deliciously fun puzzle game.',
  imageUrl: 'https://placehold.co/400x200?text=Game+Image',
  gameUrl: 'https://king.com/game/candycrushsaga',
};

export const mockCreateGameDto2: CreateGameDto = {
  name: 'PUBG Mobile',
  title: 'Battle Royale on Mobile',
  category: 'Battle Royale',
  provider: 'Tencent Games',
  description:
    '100-player battle royale on mobile. Drop in, loot up, and battle your way to be the last one standing. Multiple maps, weapons, and game modes available.',
  imageUrl: 'https://placehold.co/400x200?text=Game+Image',
  gameUrl: 'https://pubgmobile.com',
};

export const mockGameResDto: Game = {
  ...mockCreateGameDto,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockGameResDto2: Game = {
  ...mockCreateGameDto,
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockGetGameListParams: GetGameListParams = {
  page: 1,
  size: 6,
  q: 'candy',
};

export const mockGetGameListResDto: ListRes<Game> = {
  items: [mockGameResDto, mockGameResDto2],
  pagination: {
    page: 1,
    size: 6,
    total: 10,
    lastPage: 2,
  },
};

export const mockUpdateGameDto: UpdateGameDto = {
  ...mockCreateGameDto,
  id: mockGameResDto.id,
};
