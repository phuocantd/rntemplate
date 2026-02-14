import api from '~services/axios.service';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: any;
}

export const authService = {
  signIn: async (payload: SignInPayload): Promise<SignInResponse> => {
    const res = await api.post('/auth/login', payload);
    return res.data;
  },
  getProfile: async (): Promise<any> => {
    const res = await api.get('/auth/me');
    return res.data;
  },
  deleteAccount: async (): Promise<void> => {
    await api.delete('/auth/delete');
  },
  getWallet: async (): Promise<any> => {
    const res = await api.get('/wallet');
    return res.data;
  },
};
