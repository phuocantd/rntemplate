import { createMMKV } from 'react-native-mmkv';

export const mmkv = createMMKV();

const mmkvStorage = {
  setItem: (key: string, value: string) => {
    mmkv.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = mmkv.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: (key: string) => {
    mmkv.remove(key);
    return Promise.resolve();
  },
};

export default mmkvStorage;
