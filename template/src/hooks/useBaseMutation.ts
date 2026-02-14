import { useMutation } from '@tanstack/react-query';
import type { UseBaseMutationConfig } from '~types';
import { runBaseRequest } from '~utils/helpers';

/**
 * Generic mutation hook with overridable variables at call time.
 * Base config defines defaults; `mutate(variables)` can override method/url/data/params.
 * @param config Base mutation config:
 * - request defaults: `url`, optional `method`, `data`, `params`, `headers`, ...
 * - mutation options: React Query `options`.
 */
export function useBaseMutation<
  TResponse = unknown,
  TData = unknown,
  TParams = unknown,
>(config: UseBaseMutationConfig<TResponse, TData, TParams>) {
  const { options, method, ...baseConfig } = config;

  return useMutation({
    mutationFn: (variables = {}) =>
      runBaseRequest<TResponse, TData, TParams>({
        ...baseConfig,
        ...variables,
        method: variables.method ?? method ?? 'POST',
        url: variables.url ?? baseConfig.url,
        data: (variables.data ?? baseConfig.data) as TData | undefined,
        params: (variables.params ?? baseConfig.params) as TParams | undefined,
      }),
    ...options,
  });
}
