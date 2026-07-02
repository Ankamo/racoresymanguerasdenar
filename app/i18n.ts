import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      title: 'Racores y Mangueras de Nar',
      description: 'La aplicación está funcionando correctamente.',
      button: 'Probar',
    },
  },
  en: {
    translation: {
      title: 'Fittings and Hoses of Nar',
      description: 'The application is working correctly.',
      button: 'Try it',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
