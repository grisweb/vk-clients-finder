import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchTaskParams, SearchTasksState } from './types';

const initialState: SearchTasksState = {
  taskParams: null
};

const slice = createSlice({
  name: 'searchTasks',
  initialState,
  reducers: {
    setTaskParams: (state, { payload }: PayloadAction<SearchTaskParams>) => {
      state.taskParams = payload;
    }
  }
});

export const { setTaskParams } = slice.actions;
export default slice.reducer;
