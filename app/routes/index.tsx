import { data } from "react-router";
import { Form } from "react-router";
import { useTranslation } from "react-i18next";
import i18nServer from "~/modules/i18n.server";
import type { Route } from "./+types";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data?.title },
    { name: "description", content: data?.description },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  let t = await i18nServer.getFixedT(request);
  return data({ title: t("title"), description: t("description") });
}

export default function Index({ loaderData }: Route.ComponentProps) {
  let { t } = useTranslation();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{t("title")}</h1>
      <p>{loaderData.description}</p>

      <Form>
        <button type="submit" name="lng" value="es">
          Español
        </button>
        <button type="submit" name="lng" value="en">
          English
        </button>
      </Form>
    </div>
  );
}
