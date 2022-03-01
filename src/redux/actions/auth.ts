/* eslint-disable */
import Auth from '../../middleware/storage';
import Api from '../../services/apis';
import { setUser, setUserId, setRole } from '../reducers/authSlice';
import { setLoading } from '../reducers/loaderSlice';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// export const signUpUser =
//   (userData: object) => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
//     try {
//       dispatch(setLoading(true));
//       const response: AxiosResponse = await Api.auth.signUpEmail(userData);
//       console.log(response.data);
//       //   dispatch(setUser(response.data.data));
//       //   dispatch(setUserId(response.data.data.uid));
//       //   dispatch(push(paths.PROFILE));
//       dispatch(setLoading(false));
//     } catch (error) {
//       console.log(error);
//       dispatch(setLoading(false));
//     }
//   };

type AuthData = {
  data: object;
  userType: string;
};

type SignUpRes = {
  data: User;
  message: string;
  status: boolean;
};
type AxiosRes = {
  data: SignInRes;
};

export const signUpUser = createAsyncThunk('users/signup', async (userData: AuthData, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));

    if (userData.userType === 'user') {
      const response = await Api.auth.signUpEmail(userData.data);
      const res: AxiosRes = response;
      const data: SignUpRes = res.data;
      console.log(response);
      return {
        status: true,
        message: data.message,
      };
    } else {
      const response = await Api.auth.signUpOrganizerEmail(userData.data);
      const res: AxiosRes = response;
      const data: SignUpRes = res.data;
      return {
        status: true,
        message: data.message,
      };
    }
  } catch (error) {
    const err = error as AxiosError;
    thunkAPI.dispatch(setLoading(false));
    return {
      status: false,
      message: err.message,
    };
  }
});

// export const signInUser =
//   (userData: object) => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
//     try {
//       console.log('here');
//       dispatch(setLoading(true));
//       const response: AxiosResponse = await Api.auth.signInEmail(userData);
//       console.log(response.data);
// const { data } = response.data;
//   Auth.setToken(data.access_token, data.refresh_token);
//   dispatch(setUser(response.data.data));
//   dispatch(setUserId(response.data.data.uid));
//   dispatch(push(paths.PROFILE));
//     dispatch(setLoading(false));
//   } catch (error) {
//     console.log(error);
//     dispatch(setLoading(false));
//   }
// };

type User = {
  _id: string;
  codes: [];
  created_at: Date;
  email: string;
  fullname: string;
  phone: string;
  updated_at: Date;
};
type SignInRes = {
  data: User;
  message: string;
  status: boolean;
  token: string;
};

export const signInUser = createAsyncThunk('users/signin', async (userData: AuthData, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));

    if (userData.userType === 'user') {
      const response = await Api.auth.signInEmail(userData.data);
      const res: AxiosRes = response;
      const data: SignInRes = res.data;
      console.log(response);
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setUser(data.data));
      thunkAPI.dispatch(setUserId(data.data._id));
      thunkAPI.dispatch(setRole('user'));
      Auth.setToken(data.token, data.token);
      Auth.setRole('user');
      return {
        status: true as boolean,
        message: data.message,
      };
    } else {
      const response = await Api.auth.signInOrganizerEmail(userData.data);
      const res: AxiosRes = response;
      const data: SignInRes = res.data;
      console.log(response);
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setUser(data.data));
      thunkAPI.dispatch(setUserId(data.data._id));
      thunkAPI.dispatch(setRole('organizer'));
      Auth.setRole('organizer');
      Auth.setToken(data.token, data.token);
      return {
        status: true as boolean,
        message: data.message,
      };
    }
  } catch (error) {
    const err = error as AxiosError;
    thunkAPI.dispatch(setLoading(false));
    return {
      status: false,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: err.response?.data?.message as never,
    };
  }
});

export const signInMember =
  (credentials: { email: string; password: string }, type: string) =>
  async (dispatch: (arg0: any) => void) => {
    dispatch(setLoading(true));
    try {
      const res = await Api.auth.signInEmail(credentials);
      const { data } = res;
      console.log(data);
      Auth.setToken(data.token, data.token);
      await dispatch(getProfileMember(type));
      dispatch(setLoading(false));
      toast(data.message);
      return true;
    } catch (error) {
      dispatch(setLoading(false));
      const err = error as AxiosError;
      console.log(err?.response?.data?.message as never);
      toast(err?.response?.data?.message);
      return false;
    }
  };

export const signUpMember =
  (
    credentials: { email: string; password: string; fullname: string; phone: string },
    type: string,
  ) =>
  async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(setLoading(true));
    try {
      if (type == 'user') {
        const res = await Api.auth.signUpEmail(credentials);
        const { data } = res.data;
        console.log(data);
      } else {
        const res = await Api.auth.signUpOrganizerEmail(credentials);
        const { data } = res.data;
        console.log(data);
      }

      // await signInMember({ email: credentials.email, password: credentials.password });
      dispatch(setLoading(false));
      return true;
    } catch (error) {
      dispatch(setLoading(false));
      const err = error as AxiosError;
      console.log(err?.response?.data?.message as never);
      toast(err?.response?.data?.message);
      return false;
    }
  };

export const forgotPasswordMember =
  (credentials: { email: string }) =>
  async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(setLoading(true));
    try {
      const res = await Api.auth.forgotPassword(credentials);
      const { data } = res.data;
      toast('forgot password link has been sent to you email');
      console.log(data);
      dispatch(setLoading(false));
      return true;
    } catch (error) {
      dispatch(setLoading(false));
      const err = error as AxiosError;
      console.log(err?.response?.data?.message as never);
      toast(err?.response?.data?.message);
      return false;
    }
  };

export const getProfileMember =
  (type: string) => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(setLoading(true));
    try {
      if (type == 'user') {
        const res = await Api.user.userDetails();
        const { data } = res.data;
        console.log('profile', data);
        // dispatch(setUser(data));
        // dispatch(setUserId(data._id));
        // dispatch(setRole(data.type));
      } else {
        const res = await Api.user.organizerDetails();
        const { data } = res.data;
        console.log('profile', data);
        // dispatch(setUser(data));
        // dispatch(setUserId(data._id));
        // dispatch(setRole(data.type));
      }
      dispatch(setLoading(false));
      return true;
    } catch (error) {
      dispatch(setLoading(false));
      const err = error as AxiosError;
      console.log(err?.response?.data?.message as never);
      toast(err?.response?.data?.message);
      return false;
    }
  };
