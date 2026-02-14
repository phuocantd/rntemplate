import {
  type InfiniteData,
  type QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import type { BasePageParam, UseBaseInfiniteConfig } from '~types';
import {
  buildBaseQueryKey,
  defaultGetNextPageParam,
  getListSize,
  getNextParamByMode,
  getNumberField,
  pickFields,
  runBaseRequest,
  resolveArrayKey,
  resolveInitialPageParam,
} from '~utils/helpers';

/**
 * Infinite query hook with built-in pagination helpers.
 * Returns React Query result plus:
 * - `fetchMore`: alias of `fetchNextPage`
 * - `total`: value from `totalKey` on first page
 * - `fields`: picked metadata fields from first page
 * @param config Infinite config:
 * - request: `url`, optional `method`, `params`, `data`, `headers`, ...
 * - pagination: `pageParamKey`, `initialPageParam`, `totalKey`, `limitKey`, `keyArray`
 * - metadata: `fields` to pick from first page
 * - react-query: optional `queryKey`, `options`, and custom `getNextPageParam`
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

  const pageParamKeyAsString = String(pageParamKey);
  const resolvedInitialPageParam = resolveInitialPageParam(
    initialPageParam,
    pageParamKeyAsString,
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
      ((lastPage, allPages, lastPageParam) => {
        const firstPage = allPages[0];
        const total =
          getNumberField(lastPage, totalKey) ??
          getNumberField(firstPage, totalKey);
        const limit =
          getNumberField(lastPage, limitKey) ??
          getNumberField(firstPage, limitKey);
        const resolvedListKey =
          resolveArrayKey(lastPage, keyArray) ??
          resolveArrayKey(firstPage, keyArray);

        if (
          typeof total === 'number' &&
          total >= 0 &&
          limit &&
          resolvedListKey
        ) {
          const loadedCount = allPages.reduce(
            (sum, page) => sum + getListSize(page, resolvedListKey),
            0,
          );

          if (loadedCount >= total) {
            return undefined;
          }

          return getNextParamByMode(lastPageParam, pageParamKeyAsString, limit);
        }

        return defaultGetNextPageParam(lastPage);
      }),
    ...options,
  });

  const firstPage = query.data?.pages[0];
  const total = getNumberField(firstPage, totalKey);
  const fields = useMemo(
    () => pickFields<TFieldKey>(firstPage, selectedFields),
    [firstPage, selectedFields],
  );

  const hasNextPage = Boolean(query.hasNextPage);
  const fetchMore = query.fetchNextPage;

  return {
    ...query,
    hasNextPage,
    fetchMore,
    total,
    fields,
  };
}
