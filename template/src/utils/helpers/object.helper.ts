/**
 * Runtime guard for plain object-like values.
 * @param value Any runtime value to validate.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Reads a numeric field safely from an unknown response object.
 * @param page Response page object.
 * @param key Field name to read as number (for example `total` or `limit`).
 */
export function getNumberField(page: unknown, key: string): number | undefined {
  if (!isObject(page)) {
    return undefined;
  }

  const value = page[key];
  return typeof value === 'number' ? value : undefined;
}

/**
 * Extracts object key by a field id and converts it to string.
 * @param item Current array item.
 * @param keyId Field name used as key source.
 */
export function resolveKeyById<TItem>(
  item: TItem,
  keyId: string,
): string | undefined {
  if (!isObject(item)) {
    return undefined;
  }

  const keyValue = item[keyId];
  if (keyValue === undefined || keyValue === null) {
    return undefined;
  }

  return String(keyValue);
}

/**
 * Infers the first array-like key from a response object.
 * Useful as a fallback when a preferred list key is not provided or missing.
 * @param page Response page object.
 */
export function inferListKey(page: unknown): string | undefined {
  if (!isObject(page)) {
    return undefined;
  }

  return Object.keys(page).find(key => Array.isArray(page[key]));
}

/**
 * Resolves the array key from a preferred key, with auto-detection fallback.
 * @param page Response page object.
 * @param preferredKey Preferred list key (for example `products`, `recipes`, `data`).
 */
export function resolveArrayKey(
  page: unknown,
  preferredKey: string,
): string | undefined {
  if (isObject(page) && Array.isArray(page[preferredKey])) {
    return preferredKey;
  }

  return inferListKey(page);
}

/**
 * Returns the item count of an array field on a response object.
 * @param page Response page object.
 * @param key Array field name to count.
 */
export function getListSize(page: unknown, key?: string): number {
  if (!key || !isObject(page) || !Array.isArray(page[key])) {
    return 0;
  }

  return page[key].length;
}

/**
 * Picks selected top-level fields from a response object.
 * @param source Source object (usually the first page of an infinite response).
 * @param fields List of top-level keys to keep.
 */
export function pickFields<TFieldKey extends string>(
  source: unknown,
  fields?: TFieldKey[],
): Record<TFieldKey, unknown> {
  if (!fields?.length || !isObject(source)) {
    return {} as Record<TFieldKey, unknown>;
  }

  return fields.reduce((acc, field) => {
    acc[field] = source[field];
    return acc;
  }, {} as Record<TFieldKey, unknown>);
}
