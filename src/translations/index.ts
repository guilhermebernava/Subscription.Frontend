import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { us, br } from './langs';

i18n.use(initReactI18next).init({
  resources: { us: { translation: us }, br: { translation: br } },
  lng: 'br',
  fallbackLng: 'us',
  interpolation: { escapeValue: false },
});

export default i18n;

export * from './langs';
