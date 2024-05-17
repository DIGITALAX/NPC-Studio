import Link from "next/link";
import { getDictionary } from "../dictionaries";

export default async function NotFound({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center text-2xl font-at text-white break-words">
      <Link
        className="cursor-pointer w-fit h-fit flex items-center justify-center"
        href="/"
      >
        {dict[404].nada}
      </Link>
    </div>
  );
}
