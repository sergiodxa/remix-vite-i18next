import Fetch from "i18next-fetch-backend";
import i18next from "i18next";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { defaultNS, fallbackLng, supportedLngs } from "~/config/i18n";
import { getInitialNamespaces } from "remix-i18next/client";

async function main() {
  await i18next
    .use(initReactI18next)
    .use(Fetch)
    .use(I18nextBrowserLanguageDetector)
    .init({
      defaultNS,
      fallbackLng,
      supportedLngs,
      ns: getInitialNamespaces(),
      detection: { order: ["htmlTag"], caches: [] },
      backend: { loadPath: "/api/locales?lng={{lng}}&ns={{ns}}" },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>
    );
  });
}

main().catch((error) => console.error(error));
