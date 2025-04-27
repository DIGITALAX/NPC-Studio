import { usePathname, useRouter } from "next/navigation";

const useFooter = () => {
  const router = useRouter();
  const path = usePathname();

  const changeLanguage = (lang: string) => {
    const segments = path.split("/");
    segments[1] = lang;
    const newPath = segments.join("/");

    document.cookie = `NEXT_LOCALE=${lang}; path=/; SameSite=Lax`;

    router.push(newPath);
  };

  return {
    changeLanguage,
  };
};

export default useFooter;
