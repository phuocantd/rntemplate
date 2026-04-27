import { useQuery } from '@tanstack/react-query';
import type { UseBaseQueryConfig } from '~types';
import { buildBaseQueryKey, runBaseRequest } from '~utils/helpers';

/**
 * Query hook that maps a request config directly to React Query.
 *
 * Pass `url` and optional `params` / `data`; the query key is auto-derived
 * from the request identity unless `queryKey` is provided explicitly.
 */
export function useBaseQuery<
  TResponse = unknown,
  TData = unknown,
  TParams = unknown,
  TSelected = TResponse,
>(config: UseBaseQueryConfig<TResponse, TData, TParams, TSelected>) {
  const { queryKey, options, ...requestConfig } = config;

  return useQuery({
    queryKey: queryKey ?? buildBaseQueryKey(requestConfig),
    queryFn: () => runBaseRequest<TResponse, TData, TParams>(requestConfig),
    ...options,
  });
}
