import { tParams } from "@/app/[lang]/[...notFound]/page";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ModalsInternal from "./ModalsInternal";

export default async function Modals({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <ModalsInternal dict={dict} />;
}
