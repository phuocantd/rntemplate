import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from '~services/axios.service';

/**
 * Thin wrapper over Axios client to keep one request entry point.
 * Use this when you need full Axios flexibility (method, headers, params, data, etc.).
 * @param config Standard Axios request config (`url`, `method`, `params`, `data`, `headers`, ...).
 */
export function request<TResponse = unknown, TData = unknown>(
  config: AxiosRequestConfig<TData>,
) {
  return apiClient.request<TResponse, AxiosResponse<TResponse>, TData>(config);
}

export default request;
