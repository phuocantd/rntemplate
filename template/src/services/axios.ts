import axios, { RawAxiosRequestHeaders } from 'axios';
import { API_ROOT, TIMEOUT } from '~configs/constants';

const instance = axios.create({
  baseURL: API_ROOT,
  timeout: TIMEOUT,
});

export function setDefaultHeaders(headers: RawAxiosRequestHeaders) {
  Object.keys(headers).forEach((key: string) => {
    instance.defaults.headers.common[key] = headers[key];
  });
}

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
