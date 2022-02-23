import { toast } from 'react-toastify';
import Api from '../../services/apis';
import { setEvents } from '../reducers/eventSlice';
import { setLoading } from '../reducers/loaderSlice';

export const getEvents = () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
  try {
    dispatch(setLoading(true));
    const response = await Api.events.events();
    dispatch(setEvents(response.data.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
  }
};
