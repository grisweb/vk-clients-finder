interface Response<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
}

interface WithPaginationRequest {
  page: number;
  per_page: number;
}

interface WithPaginationResponse {
  meta: Pagination;
}

export type {
  Response,
  Pagination,
  WithPaginationRequest,
  WithPaginationResponse
};
