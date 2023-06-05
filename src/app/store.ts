import { configureStore } from '@reduxjs/toolkit';
import layout, { listenerMiddleware } from 'features/layout/layoutSlice';
import form from 'features/form/formSlice';
import auth, {
  listenerMiddleware as authMiddleware
} from 'features/auth/authSlice';
import searchTasks from 'features/searchTasks/searchTasksSlice';

import api from './services/api';

export const store = configureStore({
  reducer: {
    layout,
    form,
    auth,
    searchTasks,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['layout/setPopout'],
        ignoredPaths: ['layout.popout']
      }
    })
      .prepend(listenerMiddleware.middleware, authMiddleware.middleware)
      .concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
