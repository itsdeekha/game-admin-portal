export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface IPagination {
  page: number;
  size: number;
  total: number;
  lastPage: number;
}

export interface ListRes<T> {
  items: T[];
  pagination: IPagination;
}
