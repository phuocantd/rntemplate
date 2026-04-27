import Config from 'react-native-config';

export const API_ROOT = Config.API_URL;

export const API = {
  AUTH: {
    LOGIN: 'auth/login',
    REFRESH: 'auth/refresh',
    USER: 'auth/me',
    DELETE_ACCOUNT: 'auth/delete',
  },
};
