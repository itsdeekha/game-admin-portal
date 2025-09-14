import { Pagination, PaginationParams } from '../types';
import { GetListRes } from '../types/get-list-res.type';

export const parsePagination = (
  opts: PaginationParams,
  maxLimit = 50
): Required<PaginationParams> => {
  let size = opts.size ?? 0;
  if (size <= 0 || size > maxLimit) size = maxLimit;
  let page = opts.page ?? 1;
  if (page <= 0) page = 1;

  return { size, page };
};

export const infinityPagination = <T>(
  items: Array<T>,
  total: number,
  opts: Required<PaginationParams>
): GetListRes<T> => {
  const { page, size } = opts;
  const lastPage = Math.ceil(total / size);

  return {
    items,
    pagination: { size, page, total, lastPage },
  };
};
