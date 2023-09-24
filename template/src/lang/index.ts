import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './vi.json';
import en from './en.json';
import { LanguageEnum } from '~configs/constants';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: LanguageEnum.VI,
  lng: LanguageEnum.VI,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
