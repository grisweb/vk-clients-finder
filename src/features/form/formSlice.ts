import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState } from './types';

const initialState: FormState = {
  isSubmitting: false
};

const slice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setIsSubmitting: (
      state,
      { payload: isSubmitting }: PayloadAction<boolean>
    ) => {
      state.isSubmitting = isSubmitting;
    }
  }
});

export const { setIsSubmitting } = slice.actions;
export default slice.reducer;
