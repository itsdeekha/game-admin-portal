import { BaseModel } from './base.model';
import { PaginationParams } from './common.model';

export interface Game extends BaseModel {
  name: string;
  title: string;
  category: string;
  provider: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
}

export interface GetGameListParams extends PaginationParams {
  q?: string;
}

export interface CreateGameDto {
  name: string;
  title: string;
  category: string;
  provider: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
}

export interface UpdateGameDto extends CreateGameDto {
  id: number;
}
