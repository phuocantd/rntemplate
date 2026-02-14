import axios, {
  AxiosHeaders,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import { API, API_ROOT, TIMEOUT } from '~configs/constants';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export type AuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

type ConfigureAuthRefreshOptions = {
  refreshTokenHandler: (refreshToken: string) => Promise<AuthTokens>;
  onAuthTokensUpdated?: (tokens: AuthTokens) => void;
};

const apiClient = axios.create({
  baseURL: API_ROOT,
  timeout: TIMEOUT,
});

let authTokens: AuthTokens = {
  accessToken: null,
  refreshToken: null,
};

let refreshTokenHandler:
  | ConfigureAuthRefreshOptions['refreshTokenHandler']
  | null = null;
let onAuthTokensUpdated:
  | ConfigureAuthRefreshOptions['onAuthTokensUpdated']
  | null = null;
let refreshPromise: Promise<AuthTokens> | null = null;

function applyAuthorizationHeader(
  config: InternalAxiosRequestConfig,
  token?: string | null,
) {
  const authValue = token ? `Bearer ${token}` : '';
  if (config.headers instanceof AxiosHeaders) {
    config.headers.set('Authorization', authValue);
  } else {
    const headers = AxiosHeaders.from(config.headers);
    headers.set('Authorization', authValue);
    config.headers = headers;
  }
}

export function setDefaultHeaders(headers: RawAxiosRequestHeaders) {
  Object.keys(headers).forEach((key: string) => {
    apiClient.defaults.headers.common[key] = headers[key];
  });
}

export function setAuthTokens(tokens: AuthTokens) {
  authTokens = tokens;
  setDefaultHeaders({
    Authorization: tokens.accessToken ? `Bearer ${tokens.accessToken}` : '',
  });
}

export function configureAuthRefresh(options: ConfigureAuthRefreshOptions) {
  refreshTokenHandler = options.refreshTokenHandler;
  onAuthTokensUpdated = options.onAuthTokensUpdated ?? null;
}

apiClient.interceptors.request.use(config => {
  if (authTokens.accessToken) {
    applyAuthorizationHeader(config, authTokens.accessToken);
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest: InternalAxiosRequestConfig | undefined = error?.config;
    const status = error?.response?.status;

    if (
      !originalRequest ||
      originalRequest._retry ||
      status !== 401 ||
      !authTokens.refreshToken ||
      !refreshTokenHandler
    ) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url ?? '';
    const isRefreshRequest =
      requestUrl.includes(`/${API.AUTH.REFRESH}`) ||
      requestUrl.includes(API.AUTH.REFRESH);
    if (isRefreshRequest) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshTokenHandler(authTokens.refreshToken)
          .then(tokens => {
            setAuthTokens(tokens);
            onAuthTokensUpdated?.(tokens);
            return tokens;
          })
          .catch(refreshError => {
            const clearedTokens: AuthTokens = {
              accessToken: null,
              refreshToken: null,
            };
            setAuthTokens(clearedTokens);
            onAuthTokensUpdated?.(clearedTokens);
            throw refreshError;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const nextTokens = await refreshPromise;
      applyAuthorizationHeader(originalRequest, nextTokens.accessToken);
      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
