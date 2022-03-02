import { createSlice } from '@reduxjs/toolkit';
import { signInUser } from '../actions/auth';

type InitialState = {
  userId: string;
  role: string;
  user: object;
  isAuthorized: boolean;
};

const initialState = {
  userId: '',
  role: '',
  user: {},
  isAuthorized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: InitialState, action): void => {
      state.user = action.payload as object;
    },
    setUserId: (state, action) => {
      state.userId = action.payload as string;
    },
    setIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload as boolean;
    },
    setRole: (state, action) => {
      state.role = action.payload as string;
    },
    clearState: (state) => {
      state.user = {};
      state.userId = '';
      state.role = '';
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, () => {});
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isAuthorized = action.payload.status;
    });
    builder.addCase(signInUser.rejected, () => {});
  },
});

// actions
export const { setUser, setUserId, setIsAuthorized, setRole, clearState } = authSlice.actions;

// reducer
export const authReducer = authSlice.reducer;

// auth selectors
export const getIsAuthorizedSelector = (state: { auth: { isAuthorized: boolean } }) =>
  state?.auth?.isAuthorized;
export const getCurrentUser = (state: { auth: { user: object } }) => state?.auth?.user;
export const getCurrentUserId = (state: { auth: { userId: string } }) => state?.auth?.userId;
export const getCurrentUserRole = (state: { auth: { role: string } }) => state?.auth?.role;
