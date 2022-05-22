/* eslint/no-unsafe-member-access: 0 */ // --> OFF
/* eslint-disable */
import Auth from '../../middleware/storage';
import Api from '../../services/apis';
import { setAdmin, setOrganizers, setUsers } from '../reducers/adminSlice';
import {
  setCloseEventLoading,
  setCommissionLoading,
  setDeleteEventLoading,
  setLoading,
  setToggleCashOutLoading,
} from '../reducers/loaderSlice';
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

type SignUpRes = {
  data: User;
  message: string;
  status: boolean;
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

export const signUpAdmin = createAsyncThunk('users/signup', async (userData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    console.log(userData);
      const response = await Api.admin.signUp(userData);
      const res: AxiosRes = response;
      const data: SignUpRes = res.data;
      console.log(response);
      return {
        status: true,
        message: data.message,
      };
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

interface Res {
  data: [];
}

export const getUsers = createAsyncThunk('admin/getusers', async (userData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.admin.users();
    const res = response.data as Res;
    thunkAPI.dispatch(setUsers(res.data.reverse()));
    thunkAPI.dispatch(setLoading(false));
    console.log(response);
    return {
      status: true,
      message: 'Events fetched successfully',
    };
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(setLoading(false));
    return {
      status: false,
      message: 'Error in fetching events',
    };
  }
});

export const getOrganizers = createAsyncThunk(
  'admin/getorganizers',
  async (userData: object, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await Api.admin.organizers();
      const res = response.data as Res;
      thunkAPI.dispatch(setOrganizers(res.data.reverse()));
      thunkAPI.dispatch(setLoading(false));
      console.log(response);
      return {
        status: true,
        message: 'Events fetched successfully',
      };
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(setLoading(false));
      return {
        status: false,
        message: 'Error in fetching events',
      };
    }
  },
);

type axres = {
  data: {
    message: string;
  };
};
export const closeEvent = createAsyncThunk('close/event', async (showID: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setCloseEventLoading(true));
    const response = await Api.admin.closeShow({ show_id: showID });
    const res: axres = response;
    thunkAPI.dispatch(setCloseEventLoading(false));
    console.log(response);
    return {
      status: true,
      message: res.data.message,
    };
  } catch (err) {
    thunkAPI.dispatch(setCloseEventLoading(false));
    const error = err as AxiosError;
    return {
      status: false as boolean,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: error.response?.data?.message as never,
    };
  }
});

export const deleteEvent = createAsyncThunk('delete/event', async (showID: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setDeleteEventLoading(true));
    const response = await Api.admin.showDelete(showID);
    const res: axres = response;
    thunkAPI.dispatch(setDeleteEventLoading(false));
    console.log(response);
    return {
      status: true,
      message: res.data.message,
    };
  } catch (err) {
    thunkAPI.dispatch(setDeleteEventLoading(false));
    const error = err as AxiosError;
    return {
      status: false as boolean,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: error.response?.data?.message as never,
    };
  }
});

export const setCommission = createAsyncThunk('set/commision', async (data: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setCommissionLoading(true));
    const response = await Api.admin.setCommission(data);
    const res: axres = response;
    thunkAPI.dispatch(setCommissionLoading(false));
    console.log(response);
    return {
      status: true,
      message: res.data.message,
    };
  } catch (err) {
    thunkAPI.dispatch(setCommissionLoading(false));
    const error = err as AxiosError;
    return {
      status: false as boolean,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: error.response?.data?.message as never,
    };
  }
});

export const toggleCashOut = createAsyncThunk('cashout/toggle', async (data: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setToggleCashOutLoading(true));
    const response = await Api.admin.toggleCashOut(data);
    const res: axres = response;
    thunkAPI.dispatch(setToggleCashOutLoading(false));
    console.log(response);
    return {
      status: true,
      message: res.data.message,
    };
  } catch (err) {
    thunkAPI.dispatch(setToggleCashOutLoading(false));
    const error = err as AxiosError;
    return {
      status: false as boolean,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: error.response?.data?.message as never,
    };
  }
});
