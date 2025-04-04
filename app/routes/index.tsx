import { data } from "react-router";
import { Form } from "react-router";
import { useTranslation } from "react-i18next";
import type { Route } from "./+types";
import { getInstance } from "~/middleware/i18next";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data?.title },
    { name: "description", content: data?.description },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  let i18n = getInstance(context);
  return data({ title: i18n.t("title"), description: i18n.t("description") });
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
