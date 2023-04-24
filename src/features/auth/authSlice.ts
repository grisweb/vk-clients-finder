import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';
import { AuthState } from './types';

const initialState: AuthState = {
  token: window.localStorage.getItem('accessToken')
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: { payload: string | null }) => {
      state.token = action.payload;
    }
  }
});

const listenerMiddleware = createListenerMiddleware();

export const { setToken } = slice.actions;
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
