import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '~store';

export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthUser = createSelector(
  selectAuthState,
  auth => auth.user,
);

export const selectAuthProfile = createSelector(
  selectAuthState,
  auth => auth.profile,
);

export const selectAuthToken = createSelector(
  selectAuthState,
  auth => auth.token,
);

export const selectAuthRefreshToken = createSelector(
  selectAuthState,
  auth => auth.refreshToken,
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  auth => auth.loading,
);

export const selectAuthError = createSelector(
  selectAuthState,
  auth => auth.error,
);

export const selectIsLogged = createSelector(
  selectAuthState,
  auth => auth.isLogged,
);

export const selectIsAuthenticated = createSelector(
  selectAuthToken,
  selectIsLogged,
  (token, isLogged) => Boolean(token) && isLogged,
);
