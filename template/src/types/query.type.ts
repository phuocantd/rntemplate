import type {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { BasePageParam, BaseRequestConfig } from './base.type';

export type UseBaseQueryConfig<
  TResponse = unknown,
  TData = unknown,
  TParams = unknown,
  TSelected = TResponse,
> = BaseRequestConfig<TData, TParams> & {
  queryKey?: QueryKey;
  options?: Omit<
    UseQueryOptions<TResponse, Error, TSelected, QueryKey>,
    'queryKey' | 'queryFn'
  >;
};

export type BaseMutationVariables<TData = unknown, TParams = unknown> = Partial<
  BaseRequestConfig<TData, TParams>
>;

export type UseBaseMutationConfig<
  TResponse = unknown,
  TData = unknown,
  TParams = unknown,
> = BaseRequestConfig<TData, TParams> & {
  options?: Omit<
    UseMutationOptions<
      TResponse,
      Error,
      BaseMutationVariables<TData, TParams>
    >,
    'mutationFn'
  >;
};

export type GetNextPageParam<TResponse> = (
  lastPage: TResponse,
  allPages: TResponse[],
  lastPageParam: BasePageParam,
  allPageParams: BasePageParam[],
) => BasePageParam | undefined;

export type UseBaseInfiniteConfig<
  TResponse = unknown,
  TData = unknown,
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TFieldKey extends string = string,
> = Omit<BaseRequestConfig<TData, TParams>, 'params'> & {
  params?: TParams;
  queryKey?: QueryKey;
  initialPageParam?: BasePageParam;
  pageParamKey?: keyof TParams | string;
  totalKey?: string;
  limitKey?: string;
  keyArray?: string;
  fields?: TFieldKey[];
  getNextPageParam?: GetNextPageParam<TResponse>;
  options?: Omit<
    UseInfiniteQueryOptions<
      TResponse,
      Error,
      InfiniteData<TResponse>,
      QueryKey,
      BasePageParam
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >;
};
