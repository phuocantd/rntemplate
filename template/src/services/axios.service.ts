import axios, { RawAxiosRequestHeaders } from 'axios';
import { API_ROOT, TIMEOUT } from '~configs/constants';

const api = axios.create({
  baseURL: API_ROOT,
  timeout: TIMEOUT,
});

export function setDefaultHeaders(headers: RawAxiosRequestHeaders) {
  Object.keys(headers).forEach((key: string) => {
    api.defaults.headers.common[key] = headers[key];
  });
}

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default api;
