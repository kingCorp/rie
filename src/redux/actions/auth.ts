/* eslint/no-unsafe-member-access: 0 */ // --> OFF
// import { push } from 'connected-react-router';
import Auth from '../../middleware/storage';
import Api from '../../services/apis';
// import { paths } from '../../utils/constants';
import { setUser, setUserId, setRole } from '../reducers/authSlice';
import { setLoading } from '../reducers/loaderSlice';
// import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';

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

export const signUpUser = createAsyncThunk('users/signup', async (userData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.auth.signUpEmail(userData);
    // const res: AxiosRes = response;
    // const data: SignInRes = res.data;
    console.log(response);

    return true as boolean;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(setLoading(false));
    return false as boolean;
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

type AxiosRes = {
  data: SignInRes;
};
export const signInUser = createAsyncThunk('users/signin', async (userData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.auth.signInEmail(userData);
    const res: AxiosRes = response;
    const data: SignInRes = res.data;
    console.log(response);
    thunkAPI.dispatch(setLoading(false));
    thunkAPI.dispatch(setUser(data.data));
    thunkAPI.dispatch(setUserId(data.data._id));
    thunkAPI.dispatch(setRole('user'));
    Auth.setToken(data.token, data.token);
    return true as boolean;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(setLoading(false));
    return false as boolean;
  }
});
