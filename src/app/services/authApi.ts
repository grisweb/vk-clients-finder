import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User
} from 'features/auth/types';
import { setToken } from 'features/auth/authSlice';
import api from './api';

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, null>({
      query: () => ({
        url: 'users/me'
      })
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { user, accessToken }
          } = await queryFulfilled;
          dispatch(authApi.util.upsertQueryData('getMe', null, user));
          dispatch(setToken(accessToken));
        } catch {
          /* empty */
        }
      }
    }),
    logout: build.mutation<null, null>({
      query: () => ({
        url: '/logout',
        method: 'POST'
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(authApi.util.resetApiState());
        try {
          await queryFulfilled;
          dispatch(setToken(null));
        } catch {
          /* empty */
        }
      }
    }),
    register: build.mutation<LoginResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { user, accessToken }
          } = await queryFulfilled;
          dispatch(authApi.util.upsertQueryData('getMe', null, user));
          dispatch(setToken(accessToken));
        } catch {
          /* empty */
        }
      }
    })
  })
});
export const {
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation
} = authApi;
export default authApi;
