import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';
import esTranslation from './locales/es/translation.json';
import deTranslation from './locales/de/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      pt: { translation: ptTranslation },
      es: { translation: esTranslation },
      de: { translation: deTranslation },
    },
    lng: 'pt', // Idioma padrão
    fallbackLng: 'en', // Idioma fallback
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
