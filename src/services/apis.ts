import ApiHandler from './ApiHandler';

const Api = {
  auth: {
    signInEmail: (data: object) => ApiHandler.post('/auth/login', data),
    signUpEmail: (data: object) => ApiHandler.post('/users', data),
    refreshToken: (data: object) => ApiHandler.post('/auth/refresh-token', data),
    logout: (data: object) => ApiHandler.post('/auth/logout', data),
  },
  user: {
    userDetails: () => ApiHandler.get('/auth/user'),
  },
};

export default Api;
