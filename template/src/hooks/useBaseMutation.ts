import { useMutation } from '@tanstack/react-query';
import type { UseBaseMutationConfig } from '~types';
import { runBaseRequest } from '~utils/helpers';

/**
 * Mutation hook with per-call overrides.
 *
 * Base config sets defaults; calling `mutate(variables)` can override
 * `method`, `url`, `data`, `params`, or any other request field at call time.
 */
export function useBaseMutation<
  TResponse = unknown,
  TData = unknown,
  TParams = unknown,
>(config: UseBaseMutationConfig<TResponse, TData, TParams>) {
  const { options, method, ...baseConfig } = config;

  return useMutation({
    mutationFn: (variables = {}) => {
      const {
        method: varMethod,
        url: varUrl,
        data: varData,
        params: varParams,
        ...otherVars
      } = variables;

      return runBaseRequest<TResponse, TData, TParams>({
        ...baseConfig,
        ...otherVars,
        method: varMethod ?? method ?? 'POST',
        url: varUrl ?? baseConfig.url,
        data: (varData ?? baseConfig.data) as TData | undefined,
        params: (varParams ?? baseConfig.params) as TParams | undefined,
      });
    },
    ...options,
  });
}
