import axios from 'axios';
import apiClient from '~services/axios.service';
import { API, API_ROOT } from '~configs/constants';
import type {
  AuthProfile,
  RefreshTokenResponse,
  SignInPayload,
  SignInResponse,
} from '~types';

export const authService = {
  signIn: (payload: SignInPayload): Promise<SignInResponse> =>
    apiClient
      .post<SignInResponse>(`/${API.AUTH.LOGIN}`, payload, {
        withCredentials: true,
      })
      .then(res => res.data),
  refreshAccessToken: (
    refreshToken: string,
    expiresInMins = 30,
  ): Promise<RefreshTokenResponse> =>
    axios
      .post<RefreshTokenResponse>(
        `${API_ROOT}/${API.AUTH.REFRESH}`,
        {
          refreshToken,
          expiresInMins,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .then(res => res.data as RefreshTokenResponse),
  getProfile: (): Promise<AuthProfile> =>
    apiClient.get<AuthProfile>(`/${API.AUTH.USER}`).then(res => res.data),
  deleteAccount: (): Promise<void> =>
    apiClient.delete<void>(`/${API.AUTH.DELETE_ACCOUNT}`).then(() => undefined),
};
