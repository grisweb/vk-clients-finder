import { configureStore } from '@reduxjs/toolkit';
import layout, { listenerMiddleware } from 'features/layout/layoutSlice';
import form from 'features/form/formSlice';
import auth, {
  listenerMiddleware as authMiddleware
} from 'features/auth/authSlice';

import api from './services/api';

export const store = configureStore({
  reducer: {
    layout,
    form,
    auth,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware, authMiddleware.middleware)
      .concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
