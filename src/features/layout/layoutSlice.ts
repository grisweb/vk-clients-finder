import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import { AppearanceType } from '@vkontakte/vk-bridge';

import type { RootState } from 'app/store';
import type { LayoutState } from './types';

const getAppearance = (): AppearanceType => {
  const localAppearance = window.localStorage.getItem('appearance');

  if (
    localAppearance &&
    ['light', 'dark'].includes(JSON.parse(localAppearance))
  ) {
    return JSON.parse(localAppearance) as AppearanceType;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const initialState: LayoutState = {
  appearance: getAppearance()
};

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleAppearance: (state) => {
      state.appearance = state.appearance === 'light' ? 'dark' : 'light';
    }
  }
});

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: slice.actions.toggleAppearance,
  effect: async (action, api) => {
    window.localStorage.setItem(
      'appearance',
      JSON.stringify((api.getState() as RootState).layout.appearance)
    );
  }
});

export const { toggleAppearance } = slice.actions;
export { listenerMiddleware };
export default slice.reducer;
