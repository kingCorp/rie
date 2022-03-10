import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  event: {},
  myEvents: [],
  sellingEvents: [],
  upcomingEvents: [],
  pastEvents: [],
  uploadedUrl: '',
  tickets: [],
  userTickets: [],
  ticketsLoading: false,
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload as [];
    },
    setEvent: (state, action) => {
      state.event = action.payload as object;
    },
    setMyEvents: (state, action) => {
      state.myEvents = action.payload as [];
    },
    setPastEvents: (state, action) => {
      state.pastEvents = action.payload as [];
    },
    setUploadedUrl: (state, action) => {
      state.uploadedUrl = action.payload as string;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload as [];
    },
    setTicketsLoading: (state, action) => {
      state.ticketsLoading = action.payload as boolean;
    },
    setUserTickets: (state, action) => {
      state.userTickets = action.payload as [];
    },
  },
});

// actions
export const {
  setEvents,
  setEvent,
  setMyEvents,
  setPastEvents,
  setUploadedUrl,
  setTickets,
  setTicketsLoading,
  setUserTickets,
} = eventSlice.actions;

// reducer
export const eventReducer = eventSlice.reducer;

// selectors
export const getEventsSelector = (state: { events: { events: [] } }): [] =>
  state?.events?.events as [];
export const getEventSelector = (state: { events: { event: object } }) => state?.events?.event;
export const getMyEventsSelector = (state: { events: { myEvents: [] } }): [] =>
  state?.events?.myEvents as [];
export const getPastEventsSelector = (state: { events: { pastEvents: [] } }): [] =>
  state?.events?.pastEvents as [];
