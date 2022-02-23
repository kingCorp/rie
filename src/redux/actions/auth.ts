import { push } from 'connected-react-router';
import Auth from '../../middleware/storage';
import Api from '../../services/apis';
import { paths } from '../../utils/constants';
import { setUser, setUserId } from '../reducers/authSlice';
import { setLoading } from '../reducers/loaderSlice';

export const signUpUser =
  (userData: object) => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    try {
      dispatch(setLoading(true));
      const response = await Api.auth.signUpEmail(userData);
      console.log(response.data.data);
      //   dispatch(setUser(response.data.data));
      //   dispatch(setUserId(response.data.data.uid));
      //   dispatch(push(paths.PROFILE));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  export const signInUser =
  (userData: object) => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    try {
      dispatch(setLoading(true));
      const response = await Api.auth.signUpEmail(userData);
      console.log(response.data.data);
      const {data} = response.data
    //   Auth.setToken(data.access_token, data.refresh_token);
      //   dispatch(setUser(response.data.data));
      //   dispatch(setUserId(response.data.data.uid));
      //   dispatch(push(paths.PROFILE));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
