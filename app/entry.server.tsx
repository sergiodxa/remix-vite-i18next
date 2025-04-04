import { PassThrough } from "node:stream";

import type { EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { createInstance } from "i18next";
import i18nServer from "./modules/i18n.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import * as i18n from "./config/i18n";

export const streamTimeout = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext
  // If you have middleware enabled:
  // loadContext: unstable_RouterContextProvider
) {
  const instance = createInstance();
  const lng = await i18nServer.getLocale(request);
  const ns = i18nServer.getRouteNamespaces(routerContext);

  await instance.use(initReactI18next).init({ ...i18n, lng, ns });

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");

    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <ServerRouter context={routerContext} url={request.url} />
      </I18nextProvider>,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) console.error(error);
        },
      }
    );

    setTimeout(abort, streamTimeout + 1000);
  });
}
