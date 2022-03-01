import ApiHandler from './ApiHandler';

const Api = {
  auth: {
    signInEmail: (data: object) => ApiHandler.post('/user/login', data),
    signInOrganizerEmail: (data: object) => ApiHandler.post('/organizer/login', data),
    signUpEmail: (data: object) => ApiHandler.post('/user/register', data),
    signUpOrganizerEmail: (data: object) => ApiHandler.post('/organizer/register', data),
    changePassword: (data: object) => ApiHandler.post('/change_password', data),
    resendToken: (data: object) => ApiHandler.post('/send_token', data),
    refreshToken: (data: object) => ApiHandler.post('/user/refresh-token', data),
    logout: (data: object) => ApiHandler.post('/user/logout', data),
  },
  user: {
    userDetails: () => ApiHandler.get('/user/getInfo'),
  },
  events: {
    events: () => ApiHandler.get('/show/all'),
    event: (id: string) => ApiHandler.get(`/show/details/${id}`),
    getOrganizerEvents: () => ApiHandler.get('/organizer/shows'),
    createEvent: (data: object) => ApiHandler.post('/organizer/show/create', data),
  },
};

export default Api;
