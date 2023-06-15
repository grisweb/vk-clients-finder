import { ReactNode } from 'react';
import {
  createListenerMiddleware,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import type { RootState } from 'app/store';
import type { LayoutState } from './types';

const initialState: LayoutState = {
  appearance: 'light',
  activeModal: null,
  snackbar: null,
  popout: null
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
    setPopout: (state, { payload }: PayloadAction<ReactNode>) => {
      state.popout = payload;
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
    const { appearance } = (api.getState() as RootState).layout;

    window.localStorage.setItem('appearance', JSON.stringify(appearance));
  }
});

export const { toggleAppearance, setActiveModal, setPopout, snackbar } =
  slice.actions;
export { listenerMiddleware };
export default slice.reducer;
