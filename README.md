# React Router with i18next Example App

This repo is an example app using React Router with remix-i18next setup.

The app showcase how to set remix-i18next to load the translations from an imported module, it has support for English and Spanish.

## How to run

```bash
npm install
npm run dev
```

Then open your browser and go to [http://localhost:3000](http://localhost:3000)

You can go to [/?lng=es](http://localhost:3000/?lng=es) to force it to load in Spanish or to [/?lng=en](http://localhost:3000/?lng=en) to force it to load in English. which is also the default.

The application detects the locale on the `app/root.tsx`, then in `app/routes/_index.tsx` it uses a combination of `getFixedT` in the loader and `useTranslation` in the component to show the translations.

All translation files are fetched from `/api/locales` resource route which let us easily customize the cache of the translation.

It also uses a React Router cookie object to store the user preferred locale, when the user clicks a button to change from English to Spanish or vice versa, it sets the cookie, if you remove the `?lng` in the URL it will keep the user preferred locale.
