import Axios from 'axios';

const Auth = {
  setToken: (token: string, refreshToken: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  getToken: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      return token;
    }
  },
  getRefreshToken: () => {
    const token = localStorage.getItem('refresh_token');
    if (token) {
      return token;
    }
    return false;
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (token) return true;
    return false;
  },
  setRole: (role: string) => {
    localStorage.setItem('role', role);
  },
  getRole: () => {
    const role = localStorage.getItem('role');
    return role;
  },
  destroyToken: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    delete Axios.defaults.headers.common['Authorization'];
    return true;
  },
};

export default Auth;
