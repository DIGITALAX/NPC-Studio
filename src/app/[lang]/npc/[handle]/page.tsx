import { getDictionary } from "../../dictionaries";

export default async function Handle({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return (
    <div className="relative w-full min-h-screen h-fit min-w-screen flex items-center justify-center flex-col gap-10 bg-black"></div>
  );
}
