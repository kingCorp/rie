import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload as boolean;
    },
  },
});

// actions
export const { setLoading } = loaderSlice.actions;

// reducer
export const loaderReducer = loaderSlice.reducer;

// selectors
export const getIsLoading = (state: { loader: { isLoading: boolean } }) => state?.loader?.isLoading;
