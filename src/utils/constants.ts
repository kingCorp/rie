export const paths = {
  COMING: '/coming',
  HOME: '/',
  ABOUT: '/about',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  UPCOMING: '/upcoming',
  SELLING: '/selling',
  EVENTS: '/events',
  EVENT_DETAIL: '/event/:id',
  CREATE_EVENT: '/create/event',
  ADD_TICKET: '/add/ticket',
  PREVIEW_EVENT: '/preview/:id',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgotPassword',
  ERROR: '*',
};
const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

export const BASE_URL = ' https://rie-ticket.herokuapp.com/api/v1';
export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName as string}/upload`;
