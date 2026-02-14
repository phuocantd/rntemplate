export interface SignInPayload {
  username: string;
  password: string;
  expiresInMins?: number;
}

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type AuthProfile = Record<string, unknown>;

export interface SignInResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user?: AuthUser;
  profile?: AuthProfile;
  isLogged: boolean;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}
