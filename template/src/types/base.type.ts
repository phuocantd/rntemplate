import type { AxiosRequestConfig, Method } from 'axios';

export type BaseRequestConfig<TData = unknown, TParams = unknown> = Omit<
  AxiosRequestConfig<TData>,
  'url' | 'method' | 'data' | 'params'
> & {
  url: string;
  method?: Method;
  data?: TData;
  params?: TParams;
};

export type BasePageParam = number | string;
