import type { QueryKey } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import type { BaseRequestConfig } from '~types';
import request from '~utils/request';

/**
 * Creates a stable React Query key from request identity and payload.
 * @param config Request identity used for cache key generation (`url`, `method`, `params`, `data`).
 */
export function buildBaseQueryKey<TData = unknown, TParams = unknown>(
  config: Pick<BaseRequestConfig<TData, TParams>, 'url' | 'method' | 'params' | 'data'>,
): QueryKey {
  return [
    config.method ?? 'GET',
    config.url,
    config.params ?? null,
    config.data ?? null,
  ];
}

/**
 * Executes a base request and returns response data directly.
 * @param config Base request config used to call the API.
 */
export function runBaseRequest<TResponse = unknown, TData = unknown, TParams = unknown>(
  config: BaseRequestConfig<TData, TParams>,
): Promise<TResponse> {
  return request<TResponse, TData>({
    ...config,
    method: config.method ?? 'GET',
    params: config.params as AxiosRequestConfig<TData>['params'],
  }).then(response => response.data);
}
