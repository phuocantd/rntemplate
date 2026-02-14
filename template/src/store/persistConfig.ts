import { PersistConfig } from 'redux-persist';
import mmkvStorage from './mmkvStorage';
import { RootState } from './rootReducer';

export const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage: mmkvStorage,
  whitelist: ['auth'], // reducers muốn lưu
};
