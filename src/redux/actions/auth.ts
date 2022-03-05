/* eslint/no-unsafe-member-access: 0 */ // --> OFF
/* eslint-disable */
import Auth from '../../middleware/storage';
import Api from '../../services/apis';
import { setUser, setUserId, setRole } from '../reducers/authSlice';
import { setLoading } from '../reducers/loaderSlice';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

export const sendResetToken = createAsyncThunk(
  'users/reset_token',
  async (userData: AuthData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      if (userData.userType === 'user') {
        const response = await Api.auth.sendResetTokenUser(userData.data);
        const res: AxiosRes = response;
        const data: SignInRes = res.data;
        console.log(response);
        thunkAPI.dispatch(setLoading(false));
        return {
          status: true as boolean,
          message: data.message,
        };
      } else {
        const response = await Api.auth.sendResetTokenOrganizer(userData.data);
        const res: AxiosRes = response;
        const data: SignInRes = res.data;
        console.log(response);
        thunkAPI.dispatch(setLoading(false));

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
        message: "Select if you're a show promoter, because this email doesn't exist",
      };
    }
  },
);

export const changePassword = createAsyncThunk(
  'users/change_password',
  async (userData: AuthData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      if (userData.userType === 'user') {
        const response = await Api.auth.changePasswordUser(userData.data);
        const res: AxiosRes = response;
        const data: SignInRes = res.data;
        console.log(response);
        thunkAPI.dispatch(setLoading(false));
        return {
          status: true as boolean,
          message: data.message,
        };
      } else {
        const response = await Api.auth.changePasswordOrganizer(userData.data);
        const res: AxiosRes = response;
        const data: SignInRes = res.data;
        console.log(response);
        thunkAPI.dispatch(setLoading(false));

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
        message: "Select if you're a show promoter, because this email doesn't exist",
      };
    }
  },
);

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
