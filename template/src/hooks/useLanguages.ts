import { useTranslation } from 'react-i18next';
import { LanguageEnum, StorageEnum } from '~configs/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLanguages = () => {
  const { i18n, t } = useTranslation();

  const onChangeLanguage = async (lang: LanguageEnum) => {
    try {
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem(StorageEnum.LANGUAGE, lang);
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    t,
    onChangeLanguage,
    lang: i18n.language,
  };
};
