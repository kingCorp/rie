/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../services/apis';
import {
  setEvents,
  setUploadedUrl,
  setMyEvents,
  setEvent,
  setTickets,
  setTicketsLoading,
  setUserTickets,
} from '../reducers/eventSlice';
import { setCashOutLoading, setLoading } from '../reducers/loaderSlice';
// import { AppDispatch } from '../store';
import { CLOUDINARY_URL } from '../../utils/constants';
import { AxiosError } from 'axios';

// export const getEvents = () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {

// };
interface Response {
  secure_url: string;
}
interface Res {
  data: [];
}
interface EditEvent {
  showId: string;
  data: object;
}

interface EditTicket {
  id: string;
  data: object;
}

interface TicketsRes {
  data: {
    tickets: object;
  };
}
type AxiosRes = {
  data: CreateRes;
};
type CreateRes = {
  data: {
    _id: string;
  };
  message: string;
  status: boolean;
};
export const getMyEvents = createAsyncThunk('getmyevents', async (userData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.events.getOrganizerEvents();
    const res = response.data as Res;
    thunkAPI.dispatch(setMyEvents(res.data.reverse()));
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

export const getEvents = createAsyncThunk('getevents', async (userData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.events.events();
    const res = response.data as Res;
    thunkAPI.dispatch(setEvents(res.data.reverse()));
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

export const getTickets = createAsyncThunk('gettickets', async (showId: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setTicketsLoading(true));
    const response = await Api.events.getTickets(showId);
    const res = response.data as TicketsRes;
    thunkAPI.dispatch(setTickets(res.data.tickets));
    thunkAPI.dispatch(setTicketsLoading(false));
    console.log(response);
    return {
      status: true,
      message: 'Tickets fetched successfully',
    };
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(setTicketsLoading(false));
    return {
      status: false,
      message: 'Error in fetching Tickets',
    };
  }
});

export const getEvent = createAsyncThunk('getevent', async (id: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.events.event(id);
    const res = response.data as Res;
    thunkAPI.dispatch(setEvent(res.data));
    thunkAPI.dispatch(setLoading(false));
    console.log('event detaisl.....', response);
    return {
      status: true,
      message: 'Event fetched successfully',
    };
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(setLoading(false));
    return {
      status: true,
      message: 'Error in fetching event',
    };
  }
});

export const createEvent = createAsyncThunk('createEvent', async (eventData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response: AxiosRes = await Api.events.createEvent(eventData);
    const data: CreateRes = response.data;
    thunkAPI.dispatch(setLoading(false));
    console.log(response);
    return {
      status: true,
      message: data?.message,
      id: data.data._id,
    };
  } catch (error) {
    const err = error as AxiosError;
    thunkAPI.dispatch(setLoading(false));
    return {
      status: false,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: err?.response?.data?.message as never,
    };
  }
});

export const goLiveEvent = createAsyncThunk('goLiveEvent', async (eventData: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: AxiosRes = await Api.events.goLiveEvent(eventData);
    thunkAPI.dispatch(setLoading(false));
    console.log(response);
    return {
      status: true,
      message: 'Event is live successfully',
    };
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(setLoading(false));
    return {
      status: false,
      message: 'Error In going live event',
    };
  }
});

export const editEvent = createAsyncThunk('editEvent', async (eventData: EditEvent, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.events.editEvent(eventData.showId, eventData.data);
    thunkAPI.dispatch(setLoading(false));
    console.log(response);
    return {
      status: true,
      message: 'Event edited successfully',
    };
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(setLoading(false));
    return {
      status: false,
      message: 'Error in Editing Event',
    };
  }
});

export const editTicket = createAsyncThunk(
  'editticket',
  async (eventData: EditTicket, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await Api.events.editTicket(eventData.id, eventData.data);
      thunkAPI.dispatch(setLoading(false));
      console.log(response);
      return {
        status: true,
        message: 'Ticket edited successfully',
      };
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(setLoading(false));
      return {
        status: false,
        message: 'Error in Editing Ticket',
      };
    }
  },
);

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

export const createTicket = createAsyncThunk(
  'createticket',
  async (ticketData: object, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await Api.events.createTicket(ticketData);
      thunkAPI.dispatch(setLoading(false));
      console.log(response);
      return {
        status: true,
        message: 'Ticket created successfully',
      };
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(setLoading(false));
      return {
        status: false,
        message: 'Error In creating Ticket',
      };
    }
  },
);

export const createOneTicket = createAsyncThunk(
  'createoneticket',
  async (ticketData: object, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await Api.events.createOneTicket(ticketData);
      thunkAPI.dispatch(setLoading(false));
      console.log(response);
      return {
        status: true,
        message: 'Ticket created successfully',
      };
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(setLoading(false));
      return {
        status: false,
        message: 'Error In creating Ticket',
      };
    }
  },
);

export const submitTicketPayment = createAsyncThunk(
  'user/pay/ticket',
  async (data: object, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await Api.events.payTicket(data);
      thunkAPI.dispatch(setLoading(false));
      console.log(response);
      return {
        status: true,
        message: 'Payment verified',
      };
    } catch (err) {
      thunkAPI.dispatch(setLoading(false));
      return {
        status: false,
        message: 'Payment verification failed',
      };
    }
  },
);

interface UserTicketsResponse {
  data: {
    data: { codes: [] };
  };
}

export const getUserTickets = createAsyncThunk('user/tickets', async (data: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response: UserTicketsResponse = await Api.events.getUserTickets();
    thunkAPI.dispatch(setLoading(false));
    const userTickets = response?.data?.data?.codes;
    console.log(response);
    thunkAPI.dispatch(setUserTickets(userTickets));
    return {
      status: true,
      nessage: 'Tickets gotten successfully',
    };
  } catch (err) {
    return {
      status: false,
      nessage: 'Error in getting tickets',
    };
  }
});

interface Check {
  data: object;
  showID: string;
}

export const checkTicketIn = createAsyncThunk('ticket/checkin', async (data: Check, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.events.checkInTicket(data.data, data.showID);
    thunkAPI.dispatch(setLoading(false));
    console.log(response);
    return {
      status: true,
      message: 'Ticket Checked In',
    };
  } catch (error) {
    thunkAPI.dispatch(setLoading(false));
    const err = error as AxiosError;
    return {
      status: false,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: err?.response?.data?.message as never,
    };
  }
});

export const checkTicketOut = createAsyncThunk('ticket/checkout', async (data: Check, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await Api.events.checkOutTicket(data.data, data.showID);
    thunkAPI.dispatch(setLoading(false));
    console.log(response);
    return {
      status: true,
      message: 'Ticket Checked Out',
    };
  } catch (error) {
    thunkAPI.dispatch(setLoading(false));
    const err = error as AxiosError;
    return {
      status: false,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: err?.response?.data?.message as never,
    };
  }
});

export const requestCashOut = createAsyncThunk('cash/out', async (show: object, thunkAPI) => {
  try {
    thunkAPI.dispatch(setCashOutLoading(true));
    const response: AxiosRes = await Api.events.cashOut(show);
    const data: CreateRes = response.data;
    thunkAPI.dispatch(setCashOutLoading(false));
    console.log(response);
    return {
      status: true,
      message: data?.message,
    };
  } catch (error) {
    const err = error as AxiosError;
    thunkAPI.dispatch(setCashOutLoading(false));
    return {
      status: false,
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: err?.response?.data?.message as never,
    };
  }
});
