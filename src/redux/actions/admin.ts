/* eslint/no-unsafe-member-access: 0 */ // --> OFF
import Auth from '../../middleware/storage';
import Api from '../../services/apis';
import { setAdmin, setIsAuthorized } from '../reducers/adminSlice';
import { setLoading } from '../reducers/loaderSlice';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

type AxiosRes = {
  data: SignInRes;
};

export const signInAdmin = createAsyncThunk('admin/signin', async (userData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));

    const response = await Api.admin.signIn(userData);
    const res: AxiosRes = response;
    const data: SignInRes = res.data;
    console.log(response);
    thunkAPI.dispatch(setLoading(false));
    thunkAPI.dispatch(setAdmin(data.data));
    Auth.setToken(data.token, data.token);
    Auth.setRole('admin');
    return {
      status: true as boolean,
      message: data.message,
    };
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
