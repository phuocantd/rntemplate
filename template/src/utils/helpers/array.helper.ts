import { resolveKeyById } from './object.helper';
import type { ArrayToObjectOptions } from '~types';

/**
 * Runtime guard for array values.
 * @param value Any runtime value to validate.
 */
export function isArray<TItem = unknown>(value: unknown): value is TItem[] {
  return Array.isArray(value);
}

/**
 * Converts input into an array in a safe and predictable way.
 * @param value Input value to normalize.
 * @returns Empty array for `null`/`undefined`, same value for arrays, wrapped single-item array otherwise.
 */
export function asArray<TItem>(value: TItem | TItem[] | null | undefined): TItem[] {
  if (value === null || value === undefined) {
    return [];
  }

  return isArray<TItem>(value) ? value : [value];
}

/**
 * Converts an array into an object map.
 * @param list Input array.
 * @param options Mapping options.
 * @param options.keyId Object field used as key. If empty, key defaults to `String(item)`.
 * @param options.wrapValue Optional mapper to transform each output value.
 */
export function arrayToObject<TItem, TValue = TItem>(
  list: TItem[],
  options: ArrayToObjectOptions<TItem, TValue> = {},
): Record<string, TValue> {
  const { keyId, wrapValue } = options;
  const hasKeyId = Boolean(keyId);

  return list.reduce((acc, item, index, currentList) => {
    const key = hasKeyId ? resolveKeyById(item, String(keyId)) : String(item);

    if (!key) {
      return acc;
    }

    const value = wrapValue
      ? wrapValue(item, index, currentList)
      : (item as unknown as TValue);

    acc[key] = value;
    return acc;
  }, {} as Record<string, TValue>);
}
