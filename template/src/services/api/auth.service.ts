import { API } from '~configs/constants';
import type {
  AuthProfile,
  RefreshTokenResponse,
  SignInPayload,
  SignInResponse,
} from '~types';
import request from '~utils/request';

export const authService = {
  signIn: (payload: SignInPayload): Promise<SignInResponse> =>
    request<SignInResponse, SignInPayload>({
      method: 'POST',
      url: API.AUTH.LOGIN,
      data: payload,
      withCredentials: true,
    }).then(res => res.data),
  refreshAccessToken: (
    refreshToken: string,
    expiresInMins = 30,
  ): Promise<RefreshTokenResponse> =>
    request<
      RefreshTokenResponse,
      { refreshToken: string; expiresInMins: number }
    >({
      method: 'POST',
      url: API.AUTH.REFRESH,
      data: {
        refreshToken,
        expiresInMins,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then(res => res.data),
  getProfile: (): Promise<AuthProfile> =>
    request<AuthProfile>({
      method: 'GET',
      url: API.AUTH.USER,
    }).then(res => res.data),
  deleteAccount: (): Promise<void> =>
    request<void>({
      method: 'DELETE',
      url: API.AUTH.DELETE_ACCOUNT,
    }).then(() => undefined),
};
