import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TFeedback = {
    msg: string;
    type: 'error' | 'success' | 'info';
    show: boolean;
}

const slice = createSlice({
  name: 'alert',
  initialState: {} as TFeedback,
  reducers: {
    setAlert: (state, action: PayloadAction<Omit<TFeedback, 'show'>>) => {
      state.msg = action.payload.msg;
      state.type = action.payload.type;
      state.show = true;
    },
    closeAlert: (state) => {
      state.msg = '';
      state.type = 'info';
      state.show = false;
    },
  },
});

export const alertReducer = slice.reducer;
export const { setAlert, closeAlert } = slice.actions;