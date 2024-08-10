import { getDictionary } from "../dictionaries";

export default async function AgentIndex({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return (
    <div className="relative w-full h-fit min-w-screen flex items-center justify-center flex-col gap-10 min-h-fit md:bg-transparent bg-black md:px-4 md:pt-4"></div>
  );
}
