import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("404");
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center text-2xl font-at text-white break-words">
      <Link
        className="cursor-pointer w-fit h-fit flex items-center justify-center"
        href="/"
      >
        {t.rich("nada")}
      </Link>
    </div>
  );
}
