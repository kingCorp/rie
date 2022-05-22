import Axios from 'axios';
interface User {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

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
  setUser: (user: object) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getUser: () => {
    const user = JSON.parse(localStorage.getItem('user') as string) as User;
    return user;
  },
  setAccounts: (accounts: []) => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  },
  getAccounts: () => {
    const accounts = JSON.parse(localStorage.getItem('accounts') as string) as [];
    return accounts;
  },
};

export default Auth;
