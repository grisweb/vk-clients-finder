import { FoundUser } from 'features/searchTasks/types';
import { WithPaginationRequest, WithPaginationResponse } from 'app/types';

interface CreateFavoriteRequest {
  user_id: string;
}

interface GetFavoritesResponse extends WithPaginationResponse {
  found_users: FoundUser[];
}

type GetFavoritesRequest = WithPaginationRequest;

type DeleteFavoriteRequest = CreateFavoriteRequest;

export type {
  CreateFavoriteRequest,
  GetFavoritesRequest,
  GetFavoritesResponse,
  DeleteFavoriteRequest
};
