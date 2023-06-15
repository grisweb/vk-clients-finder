import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import { setToken } from 'features/auth/authSlice';

import { Response } from '../types';
import type { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }
});

const query: BaseQueryFn<
  string | FetchArgs,
  Response<unknown>,
  FetchBaseQueryError & { message?: string }
> = async (args, api, extraOptions) => {
  const result = (await baseQuery(args, api, extraOptions)) as QueryReturnValue<
    Response<unknown>,
    FetchBaseQueryError & { message?: string },
    FetchBaseQueryMeta
  >;

  if (result.error && result.error.status === 401) {
    api.dispatch(setToken(null));
  }

  if (result.error?.data) {
    result.error.message = (
      result?.error?.data as { message?: string }
    ).message;
  }

  if (result.data) {
    (result.data as unknown) = result.data.data;
  }

  return result;
};

const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: query,
  endpoints: () => ({}),
  tagTypes: ['Task', 'Favorite']
});

export default api;
