import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (
      await (locale === "en"
        ? import("./../public/locale/en.json")
        : import(`./../public/locale/${locale}.json`))
    ).default,
  };
});
