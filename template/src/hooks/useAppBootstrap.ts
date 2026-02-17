import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useDeviceContext } from 'twrnc';
import { StorageEnum } from '~configs/constants';
import tw from '~configs/tw';
import {
  selectAuthRefreshToken,
  selectAuthToken,
} from '~features/auth/auth.selector';
import { logout, updateFields } from '~features/auth/auth.slice';
import { authService } from '~services/api';
import { configureAuthRefresh, setAuthTokens } from '~services/axios.service';
import type { AppDispatch } from '~store';
import { mmkv } from '~store/mmkvStorage';

export const useAppBootstrap = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectAuthToken);
  const refreshToken = useSelector(selectAuthRefreshToken);
  useDeviceContext(tw);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const language = mmkv.getString(StorageEnum.LANGUAGE);
        if (language) {
          await i18n.changeLanguage(language);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    initLanguage();
  }, [i18n]);

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
