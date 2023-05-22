import {
  createListenerMiddleware,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import type { RootState } from 'app/store';
import { AuthState } from './types';

const initialState: AuthState = {
  token: window.localStorage.getItem('accessToken'),
  vk_token: null
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState['token']>) => {
      state.token = action.payload;
    },
    setVkToken: (state, action: PayloadAction<AuthState['vk_token']>) => {
      state.vk_token = action.payload;
    }
  }
});

const listenerMiddleware = createListenerMiddleware();

export const { setToken, setVkToken } = slice.actions;
export default slice.reducer;

export const getToken = (state: RootState) => state.auth.token;

listenerMiddleware.startListening({
  actionCreator: setToken,
  effect: async (action, api) => {
    const { token } = (api.getState() as RootState).auth;
    if (token) {
      window.localStorage.setItem('accessToken', token);
    } else {
      window.localStorage.removeItem('accessToken');
    }
  }
});

export { listenerMiddleware };
