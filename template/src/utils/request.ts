import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from '~services/axios.service';

export function request<TResponse = unknown, TData = unknown>(
  config: AxiosRequestConfig<TData>,
) {
  return apiClient.request<TResponse, AxiosResponse<TResponse>, TData>(config);
}

export default request;
