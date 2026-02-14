import api from '~services/axios.service';
import { API } from '~configs/constants';

export interface SignInPayload {
  email: string;
  password: string;
}

export type AuthUser = Record<string, unknown>;
export type AuthProfile = Record<string, unknown>;
export type AuthWallet = Record<string, unknown>;

export interface SignInResponse {
  token: string;
  user: AuthUser;
}

export const authService = {
  signIn: (payload: SignInPayload): Promise<SignInResponse> =>
    api.post<SignInResponse>(`/${API.AUTH.LOGIN}`, payload).then(res => res.data),
  getProfile: (): Promise<AuthProfile> =>
    api.get<AuthProfile>(`/${API.AUTH.USER}`).then(res => res.data),
  deleteAccount: (): Promise<void> =>
    api.delete<void>(`/${API.AUTH.DELETE_ACCOUNT}`).then(() => undefined),
  getWallet: (): Promise<AuthWallet> =>
    api.get<AuthWallet>(`/${API.AUTH.WALLET}`).then(res => res.data),
};
