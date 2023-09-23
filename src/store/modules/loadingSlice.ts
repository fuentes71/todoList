import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};
const slice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    closeLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const loadingReducer = slice.reducer;
export const { setLoading, closeLoading } = slice.actions;
