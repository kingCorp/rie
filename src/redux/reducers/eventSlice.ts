import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  event: {},
  myEvents: [],
  sellingEvents: [],
  upcomingEvents: [],
  pastEvents: [],
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
  },
});

// actions
export const { setEvents, setEvent, setMyEvents, setPastEvents } = eventSlice.actions;

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
