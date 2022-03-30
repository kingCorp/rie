import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  accountLoading: false,
  closeEventLoading: false,
  deleteEventLoading: false,
  commissionLoading: false,
  cashOutLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload as boolean;
    },
    setAccountLoading: (state, action) => {
      state.accountLoading = action.payload as boolean;
    },
    setCloseEventLoading: (state, action) => {
      state.closeEventLoading = action.payload as boolean;
    },
    setDeleteEventLoading: (state, action) => {
      state.deleteEventLoading = action.payload as boolean;
    },
    setCommissionLoading: (state, action) => {
      state.commissionLoading = action.payload as boolean;
    },
    setCashOutLoading: (state, action) => {
      state.cashOutLoading = action.payload as boolean;
    },
  },
});

// actions
export const {
  setLoading,
  setAccountLoading,
  setCloseEventLoading,
  setCommissionLoading,
  setDeleteEventLoading,
  setCashOutLoading,
} = loaderSlice.actions;

// reducer
export const loaderReducer = loaderSlice.reducer;

// selectors
export const getIsLoading = (state: { loader: { isLoading: boolean } }) => state?.loader?.isLoading;
