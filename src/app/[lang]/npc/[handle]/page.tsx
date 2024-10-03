import NPC from "@/components/layout/modules/npc";
import { getDictionary } from "../../dictionaries";

export default async function Handle({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await (getDictionary as  (locale: any) => Promise<any>)(lang);
  return <NPC dict={dict} lang={lang} />;
}
