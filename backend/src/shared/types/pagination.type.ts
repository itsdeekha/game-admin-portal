export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface Pagination {
  page: number;
  size: number;
  total: number;
  lastPage: number;
}
