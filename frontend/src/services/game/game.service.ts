import { ListRes } from '~/models/common.model';
import {
  CreateGameDto,
  Game,
  GetGameListParams,
  UpdateGameDto,
} from '~/models/game.model';
import http from '../http';

export async function createGame(dto: CreateGameDto): Promise<Game> {
  return http.post(`/api/v1/games`, dto);
}

export async function getGameList(
  params: GetGameListParams
): Promise<ListRes<Game>> {
  return http.get(`/api/v1/games`, { params });
}

export async function getGame(id: number): Promise<Game> {
  return http.get(`/api/v1/games/${id}`);
}

export async function updateGame(dto: UpdateGameDto): Promise<Game> {
  const { id, ...body } = dto;

  return http.put(`/api/v1/games/${id}`, body);
}

export async function deleteGame(id: number): Promise<void> {
  return http.delete(`/api/v1/games/${id}`);
}
