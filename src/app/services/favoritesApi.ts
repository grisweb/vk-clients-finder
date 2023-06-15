import {
  CreateFavoriteRequest,
  DeleteFavoriteRequest,
  GetFavoritesRequest,
  GetFavoritesResponse
} from 'features/favorites/types';

import api from './api';

const favoritesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addFavorite: builder.mutation<null, CreateFavoriteRequest>({
      query: (body) => ({
        url: '/favorites',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Favorite']
    }),
    deleteFavorite: builder.mutation<null, DeleteFavoriteRequest>({
      query: (body) => ({
        url: '/favorites',
        method: 'DELETE',
        body
      }),
      invalidatesTags: ['Favorite']
    }),
    getFavorites: builder.query<GetFavoritesResponse, GetFavoritesRequest>({
      query: (params) => ({
        url: '/favorites',
        params
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.found_users.map(({ id }) => ({
                type: 'Favorite' as const,
                id
              })),
              'Favorite'
            ]
          : ['Favorite']
    })
  })
});

export const {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation
} = favoritesApi;
export default favoritesApi;
