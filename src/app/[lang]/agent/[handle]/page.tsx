import Agent from "@/app/components/Agent/modules/Agent";
import { tParams } from "../../[...notFound]/page";
import { getDictionary } from "../../dictionaries";

export default async function Handle({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <Agent dict={dict} lang={lang} />;
}
