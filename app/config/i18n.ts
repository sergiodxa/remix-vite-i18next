import en from "~/locales/en";
import es from "~/locales/es";

// This is the list of languages your application supports
export const supportedLngs = ["es", "en"];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
export const fallbackLng = "en";

// The default namespace of i18next is "translation", but you can customize it
// here
export const defaultNS = "translation";

export const resources = {
  en: { translation: en },
  es: { translation: es },
};
