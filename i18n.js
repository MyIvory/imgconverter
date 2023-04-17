import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'uk',
    debug: true,
    detection: {
      order: ['cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
      cookieSecure: process.env.NODE_ENV === 'production',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },

    resources: {
          en: {
              header: require('./public/locales/en/header.json'),
          },
          uk: {
              header: require('./public/locales/uk/header.json'),
          },
        },
  });

export default i18n;
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import { NextI18NextInstance } from 'next-i18next';
// import Backend from 'i18next-http-backend';

// i18n.use(initReactI18next).init({
//   resources: {
//     en: {
//         header: require('./public/locales/en/header.json'),
//     },
//     uk: {
//         header: require('./public/locales/uk/header.json'),
//     },
//   },
//   fallbackLng: 'uk',
//   debug: true,
//   interpolation: {
//     escapeValue: false,
//   },
// });

// export default i18n;