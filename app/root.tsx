import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";
import i18nServer, { localeCookie } from "./modules/i18n.server";
import { useChangeLanguage } from "remix-i18next/react";
import type { Route } from "./+types/root";

export const handle = { i18n: ["translation"] };

export async function loader({ request }: Route.LoaderArgs) {
  const locale = await i18nServer.getLocale(request);
  return data(
    { locale },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang={loaderData?.locale ?? "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  useChangeLanguage(loaderData.locale);
  return <Outlet />;
}
