import {
  useQuery,
} from '@tanstack/react-query';
import type { UseBaseQueryConfig } from '~types';
import {
  buildBaseQueryKey,
  runBaseRequest,
} from '~utils/helpers';

/**
 * Generic query hook that maps request config directly to React Query.
 * Pass `url`, optional `params/data`, and React Query `options` when needed.
 * @param config Hook config:
 * - request: `url`, optional `method`, `params`, `data`, `headers`, ...
 * - query: optional `queryKey`, `options` from React Query.
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
