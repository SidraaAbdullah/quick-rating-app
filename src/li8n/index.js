import en from './en';
import fr from './fr';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: en,
  fr: fr,
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale.substring(0, 2);

export default i18n;
