import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import i18nServer from "~/modules/i18n.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    { name: "description", content: data?.description },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(request);
  return json({ title: t("title"), description: t("description") });
}

export default function Index() {
  const { t } = useTranslation();
  const { description } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{t("title")}</h1>
      <p>{description}</p>

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
