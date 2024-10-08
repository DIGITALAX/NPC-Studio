import { getDictionary } from "../dictionaries";
import Agents from "@/components/layout/modules/agents";

export default async function AgentIndex({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await (getDictionary as  (locale: any) => Promise<any>)(lang);
  return <Agents dict={dict} lang={lang} />;
}
