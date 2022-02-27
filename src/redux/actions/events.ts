import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../services/apis';
import { setEvents, setUploadedUrl } from '../reducers/eventSlice';
import { setLoading } from '../reducers/loaderSlice';
import { AppDispatch } from '../store';
import { CLOUDINARY_URL } from '../../utils/constants';

// export const getEvents = () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {

// };
interface Response {
  secure_url: string;
}
interface Res {
  data: [];
}

export const getEvents = createAsyncThunk('getevents', async (userData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.events.getOrganizerEvents();
    const res = response.data as Res;
    thunkAPI.dispatch(setEvents(res.data));
    thunkAPI.dispatch(setLoading(false));
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
    thunkAPI.dispatch(setLoading(false));
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(setLoading(false));
    return error;
  }
});

export const handleFileUpload = createAsyncThunk('uploadFile', async (file: File, thunkAPI) => {
  if (!file) return console.error('No file selected');
  thunkAPI.dispatch(setLoading(true));
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_PUBLIC_CLOUDINARY_PRESET as string);
  const options = { method: 'POST', body: formData };
  try {
    const response = await fetch(CLOUDINARY_URL, options);
    const res = (await response.json()) as object;
    console.log(res);
    thunkAPI.dispatch(setLoading(false));
    const { secure_url } = res as Response;
    console.log(secure_url);
    thunkAPI.dispatch(setUploadedUrl(secure_url));
    return {
      status: true,
      message: 'Image uploaded successfully',
    };
  } catch (err) {
    thunkAPI.dispatch(setLoading(false));
    return {
      status: false,
      message: 'An error occurred in uploading the image',
    };
  }
});
