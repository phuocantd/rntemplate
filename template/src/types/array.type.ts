export type ArrayToObjectOptions<TItem, TValue = TItem> = {
  keyId?: string | null;
  wrapValue?: (item: TItem, index: number, list: TItem[]) => TValue;
};
