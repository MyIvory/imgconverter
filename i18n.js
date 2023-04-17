import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n.use(initReactI18next).init({
  resources: {
    en: {
        translation: require('./public/locales/en.json'),
    },
    uk: {
        translation: require('./public/locales/uk.json'),
    },
  },
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;