import { isObject } from './object.helper';
import type { BasePageParam } from '~types';

/**
 * Resolves the first page param.
 * - `page` mode starts at 1
 * - `skip/offset` mode starts at 0
 * @param initialPageParam Optional explicit initial page value.
 * @param pageParamKey Pagination key name (`page`, `skip`, `offset`, ...).
 */
export function resolveInitialPageParam(
  initialPageParam: BasePageParam | undefined,
  pageParamKey: string,
): BasePageParam {
  if (initialPageParam !== undefined) {
    return initialPageParam;
  }

  return pageParamKey === 'skip' || pageParamKey === 'offset' ? 0 : 1;
}

/**
 * Computes next page param based on pagination mode.
 * @param lastPageParam Current page parameter from React Query.
 * @param pageParamKey Pagination key name (`page`, `skip`, `offset`, ...).
 * @param limit Page size used for offset mode.
 */
export function getNextParamByMode(
  lastPageParam: BasePageParam,
  pageParamKey: string,
  limit?: number,
): BasePageParam | undefined {
  const isOffsetMode = pageParamKey === 'skip' || pageParamKey === 'offset';
  const step = isOffsetMode ? limit : 1;

  if (typeof lastPageParam === 'number') {
    if (!step) {
      return undefined;
    }
    return lastPageParam + step;
  }

  if (typeof lastPageParam === 'string') {
    const parsed = Number(lastPageParam);
    if (Number.isNaN(parsed) || !step) {
      return undefined;
    }
    return String(parsed + step);
  }

  return undefined;
}

/**
 * Fallback parser for APIs that return `nextPage` or `next`.
 * @param lastPage Last fetched response page.
 */
export function defaultGetNextPageParam(
  lastPage: unknown,
): BasePageParam | undefined {
  if (!isObject(lastPage)) {
    return undefined;
  }

  if (
    typeof lastPage.nextPage === 'number' ||
    typeof lastPage.nextPage === 'string'
  ) {
    return lastPage.nextPage;
  }

  if (typeof lastPage.next === 'number' || typeof lastPage.next === 'string') {
    return lastPage.next;
  }

  return undefined;
}
