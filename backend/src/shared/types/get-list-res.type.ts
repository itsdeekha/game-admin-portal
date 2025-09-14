import { Pagination } from './pagination.type';

export interface GetListRes<T> {
  items: Array<T>;
  pagination: Pagination;
}
