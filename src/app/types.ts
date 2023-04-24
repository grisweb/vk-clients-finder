interface Response<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Pagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

interface WithPaginationRequest {
  page: number;
  perPage: number;
}

interface WithPaginationResponse {
  pagination: Pagination;
}

interface Image {
  id: string;
  url: string;
}

interface File {
  id: string;
  url?: string;
  name: string;
}

export type {
  Response,
  Pagination,
  WithPaginationRequest,
  WithPaginationResponse,
  Image,
  File
};
