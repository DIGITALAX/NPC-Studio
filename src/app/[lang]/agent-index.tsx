import { getDictionary } from "./dictionaries";

export default async function AgentIndex({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return <div></div>;
}
