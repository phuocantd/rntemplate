import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthRefreshToken,
  selectAuthToken,
} from '~features/auth/auth.selector';
import { logout, updateFields } from '~features/auth/auth.slice';
import { authService } from '~services/api';
import { configureAuthRefresh, setAuthTokens } from '~services/axios.service';
import type { AppDispatch } from '~store';

export const useAppBootstrap = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectAuthToken);
  const refreshToken = useSelector(selectAuthRefreshToken);

  useEffect(() => {
    configureAuthRefresh({
      refreshTokenHandler: authService.refreshAccessToken,
      onAuthTokensUpdated: tokens => {
        if (!tokens.accessToken) {
          dispatch(logout());
          return;
        }

        dispatch(
          updateFields({
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            isLogged: true,
          }),
        );
      },
    });
  }, [dispatch]);

  useEffect(() => {
    setAuthTokens({
      accessToken: token,
      refreshToken,
    });
  }, [refreshToken, token]);
};
