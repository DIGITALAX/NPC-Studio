import Agents from "@/app/components/Index/modules/Agents";
import { tParams } from "../[...notFound]/page";
import { getDictionary } from "../dictionaries";

export default async function AgentIndex({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <Agents dict={dict} lang={lang} />;
}
