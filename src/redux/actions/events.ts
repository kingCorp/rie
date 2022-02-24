import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Api from '../../services/apis';
import { setEvents } from '../reducers/eventSlice';
import { setLoading } from '../reducers/loaderSlice';
import { AppDispatch } from '../store';

// export const getEvents = () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {

// };

export const getEvents = createAsyncThunk('getevents', async (userData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.events.getOrganizerEvents();
    // thunkAPI.dispatch(setEvents(response.data.data));
    // thunkAPI.dispatch(setLoading(false));
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(setLoading(false));
    return error;
  }
});

export const createEvents = createAsyncThunk('createEvent', async (eventData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.events.createEvent(eventData);
    // thunkAPI.dispatch(setEvents(response.data.data));
    // thunkAPI.dispatch(setLoading(false));
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(setLoading(false));
    return error;
  }
});
