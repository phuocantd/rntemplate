import { useTranslation } from 'react-i18next';
import { useDeviceContext } from 'twrnc';
import tw from './tw';
import { useEffect } from 'react';
import { StorageEnum } from './constants';
import { mmkv } from '~store/mmkvStorage';

export const useConfigApp = () => {
  const { i18n } = useTranslation();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
