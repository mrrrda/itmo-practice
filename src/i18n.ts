import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './i18n/en/translation.json';
import ru from './i18n/ru/translation.json';

const resources = {
  ru: {
    translation: ru,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  // debug: true,

  resources,
  lng: 'ru',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
