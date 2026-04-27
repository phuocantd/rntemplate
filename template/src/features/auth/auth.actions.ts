import {
  type AuthProfile,
  type SignInPayload,
  type SignInResponse,
} from '~types';
import { createRequestActions } from '~utils/createRequestActions';

export const signInActions = createRequestActions<
  SignInPayload,
  SignInResponse,
  string
>('auth/signIn');

export const deleteAccountActions = createRequestActions('auth/deleteAccount');

export const getProfileActions = createRequestActions<void, AuthProfile, string>(
  'auth/getProfile',
);
