import { createSlice } from '@reduxjs/toolkit';
import { signInAdmin } from '../actions/admin';

type InitialState = {
  admin: object;
  isAuthorized: boolean;
  users: [];
  organizers: [];
  showTickets: [];
};

const initialState = {
  admin: {},
  isAuthorized: false,
  users: [],
  organizers: [],
  showTickets: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action): void => {
      state.admin = action.payload as object;
    },
    setUsers: (state, action) => {
      state.users = action.payload as [];
    },
    setIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload as boolean;
    },
    setOrganizers: (state, action) => {
      state.organizers = action.payload as [];
    },
    setShowTickets: (state, action) => {
      state.showTickets = action.payload as [];
    },
    clearState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInAdmin.pending, () => {});
    builder.addCase(signInAdmin.fulfilled, (state, action) => {
      state.isAuthorized = action.payload.status;
    });
    builder.addCase(signInAdmin.rejected, () => {});
  },
});

// actions
export const { setUsers, setAdmin, setIsAuthorized, setOrganizers, setShowTickets, clearState } =
  adminSlice.actions;

// reducer
export const adminReducer = adminSlice.reducer;

// auth selectors
// export const getIsAuthorizedSelector = (state: { auth: { isAuthorized: boolean } }) =>
//   state?.auth?.isAuthorized;
// export const getCurrentUser = (state: { auth: { user: object } }) => state?.auth?.user;
// export const getCurrentUserId = (state: { auth: { userId: string } }) => state?.auth?.userId;
// export const getCurrentUserRole = (state: { auth: { role: string } }) => state?.auth?.role;
