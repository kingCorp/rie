import { BASE_URL } from '../utils/constants';
import axiosApiInstance from './AxiosInstance';
const ApiHandler = {
  post: async (url: string, data: object) => axiosApiInstance.post(BASE_URL + url, data),
  put: async (url: string, data: object) => axiosApiInstance.put(BASE_URL + url, data),
  delete: async (url: string) => axiosApiInstance.delete(BASE_URL + url),
  get: async (url: string) => axiosApiInstance.get(BASE_URL + url),
};
export default ApiHandler;
