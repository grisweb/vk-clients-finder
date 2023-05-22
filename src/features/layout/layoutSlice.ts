import {
  createListenerMiddleware,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
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
  appearance: getAppearance(),
  activeModal: null,
  snackbar: null
};

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleAppearance: (state) => {
      state.appearance = state.appearance === 'light' ? 'dark' : 'light';
    },
    setActiveModal: (
      state,
      { payload }: PayloadAction<LayoutState['activeModal']>
    ) => {
      state.activeModal = payload;
    },
    snackbar: (state, { payload }: PayloadAction<LayoutState['snackbar']>) => {
      state.snackbar = payload;
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

export const { toggleAppearance, setActiveModal, snackbar } = slice.actions;
export { listenerMiddleware };
export default slice.reducer;
