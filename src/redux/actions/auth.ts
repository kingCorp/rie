/* eslint/no-unsafe-member-access: 0 */ // --> OFF
/* eslint-disable */
import Auth from '../../middleware/storage';
import Api from '../../services/apis';
import { setUser, setUserId, setRole } from '../reducers/authSlice';
import { setAccountLoading, setLoading } from '../reducers/loaderSlice';
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
    console.log(err.response);
    return {
      status: false,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: err.response?.data?.message as never,
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
  accountInfo: [];
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
      Auth.setUser(data.data);
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
      Auth.setUser(data.data);
      Auth.setAccounts(data.data.accountInfo);
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

type axres = {
  data: {
    message: string;
  };
};
interface AccountDetails {
  name: string;
  number: string;
  bank_name: string;
}

export const addAccountDetails = createAsyncThunk(
  'add/account',
  async (data: AccountDetails, thunkAPI) => {
    thunkAPI.dispatch(setAccountLoading(true));
    try {
      const response = await Api.auth.addOrganizerAccountDetails(data);
      const res: axres = response;
      thunkAPI.dispatch(setAccountLoading(false));
      return {
        status: true as boolean,
        message: res.data.message,
      };
    } catch (err) {
      const error = err as AxiosError;
      return {
        status: false as boolean,
        //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message: error.response?.data?.message as never,
      };
    }
  },
);

export const deleteAccountDetails = createAsyncThunk(
  'delete/account',
  async (accountId: string, thunkAPI) => {
    thunkAPI.dispatch(setAccountLoading(true));
    try {
      const response = await Api.auth.organizerAccountDelete(accountId);
      const res: axres = response;
      thunkAPI.dispatch(setAccountLoading(false));
      return {
        status: true as boolean,
        message: res.data.message,
      };
    } catch (err) {
      const error = err as AxiosError;
      return {
        status: false as boolean,
        //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message: error.response?.data?.message as never,
      };
    }
  },
);
