import {
  type InfiniteData,
  type QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import type { BasePageParam, UseBaseInfiniteConfig } from '~types';
import {
  buildBaseQueryKey,
  buildPaginatedGetNextPageParam,
  getNumberField,
  pickFields,
  resolveInitialPageParam,
  runBaseRequest,
} from '~utils/helpers';

/**
 * Infinite query hook with built-in pagination.
 *
 * Returns all standard React Query fields plus:
 * - `fetchMore` — alias of `fetchNextPage`
 * - `total`     — total item count read from the first page
 * - `fields`    — picked metadata fields from the first page
 */
export function useBaseInfinite<
  TResponse = unknown,
  TData = unknown,
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TFieldKey extends string = string,
>(config: UseBaseInfiniteConfig<TResponse, TData, TParams, TFieldKey>) {
  const {
    queryKey,
    initialPageParam,
    pageParamKey = 'page',
    totalKey = 'total',
    limitKey = 'limit',
    keyArray = 'data',
    fields: selectedFields,
    getNextPageParam,
    options,
    params,
    ...requestConfig
  } = config;

  const pageParamKeyStr = String(pageParamKey);
  const resolvedInitialPageParam = resolveInitialPageParam(
    initialPageParam,
    pageParamKeyStr,
  );

  const query = useInfiniteQuery<
    TResponse,
    Error,
    InfiniteData<TResponse>,
    QueryKey,
    BasePageParam
  >({
    queryKey: queryKey ?? buildBaseQueryKey({ ...requestConfig, params }),
    initialPageParam: resolvedInitialPageParam,
    queryFn: ({ pageParam }) =>
      runBaseRequest<TResponse, TData, TParams>({
        ...requestConfig,
        params: {
          ...(params ?? ({} as TParams)),
          [pageParamKey]: pageParam,
        } as TParams,
      }),
    getNextPageParam:
      getNextPageParam ??
      buildPaginatedGetNextPageParam<TResponse>(
        totalKey,
        limitKey,
        keyArray,
        pageParamKeyStr,
      ),
    ...options,
  });

  const firstPage = query.data?.pages[0];
  const total = getNumberField(firstPage, totalKey);
  const fields = useMemo(
    () => pickFields<TFieldKey>(firstPage, selectedFields),
    [firstPage, selectedFields],
  );

  return {
    ...query,
    hasNextPage: Boolean(query.hasNextPage),
    fetchMore: query.fetchNextPage,
    total,
    fields,
  };
}
