import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import i18nServer, { localeCookie } from "./modules/i18n.server";
import { useChangeLanguage } from "remix-i18next/react";

export const handle = { i18n: ["translation"] };

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  return json(
    { locale },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } },
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

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);
  return <Outlet />;
}
