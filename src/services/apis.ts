import ApiHandler from './ApiHandler';

const Api = {
  auth: {
    signInEmail: (data: object) => ApiHandler.post('/user/login', data),
    signUpEmail: (data: object) => ApiHandler.post('/user/register', data),
    changePassword: (data: object) => ApiHandler.post('/change_password', data),
    resendToken: (data: object) => ApiHandler.post('/send_token', data),
    refreshToken: (data: object) => ApiHandler.post('/user/refresh-token', data),
    logout: (data: object) => ApiHandler.post('/user/logout', data),
  },
  user: {
    userDetails: () => ApiHandler.get('/user/getInfo'),
  },
  events: {
    events: () => ApiHandler.get('/events'),
  },
};

export default Api;
