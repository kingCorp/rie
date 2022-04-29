export const paths = {
  COMING: '/coming',
  HOME: '/',
  ABOUT: '/about',
  ADMIN: '/admin',
  ADMIN_SIGN_UP: '/admin/signup',
  ADMIN_EVENTS: '/admin/events',
  ADMIN_USERS: '/admin/users',
  ADMIN_ORGANIZERS: '/admin/organizers',
  DASHBOARD: '/dashboard',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  UPCOMING: '/upcoming',
  SELLING: '/selling',
  EVENTS: '/events',
  EVENT_DETAIL: '/event/:id',
  EVENT_EDIT: '/event/edit/:id',
  TICKET_EDIT: '/ticket/edit/:id',
  CREATE_EVENT: '/create/event',
  ADD_TICKET: '/add/ticket/:showId',
  PREVIEW_EVENT: '/preview/:id',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  TOC: '/toc',
  ERROR: '*',
};
const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

export const BASE_URL = ' https://rie-ticket.herokuapp.com/api/v1';
// export const BASE_URL = 'https://rie-tickets-staging.herokuapp.com/api/v1';
export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName as string}/upload`;
export const GOOOGLE_AUTOCOMPLETE_API_KEY = process.env.REACT_APP_GOOOGLE_AUTOCOMPLETE_API_KEY;
export const GOOGLEAPIS = 'https://gloc-api.herokuapp.com/location?';
export const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
