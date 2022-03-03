import { BASE_URL, GOOGLEAPIS } from '../utils/constants';
import axiosApiInstance from './AxiosInstance';

const ApiHandler = {
  getplaces: async (url: string) => {
    const response = await fetch(GOOGLEAPIS + url, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    return response;
  },

  post: async (url: string, data: object) => axiosApiInstance.post(BASE_URL + url, data),
  put: async (url: string, data: object) => axiosApiInstance.put(BASE_URL + url, data),
  delete: async (url: string) => axiosApiInstance.delete(BASE_URL + url),
  get: async (url: string) => axiosApiInstance.get(BASE_URL + url),
};
export default ApiHandler;
