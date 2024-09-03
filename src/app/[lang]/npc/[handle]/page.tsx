import NPC from "@/components/layout/modules/npc";
import { getDictionary } from "../../dictionaries";

export default async function Handle({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return <NPC dict={dict} lang={lang} />;
}
