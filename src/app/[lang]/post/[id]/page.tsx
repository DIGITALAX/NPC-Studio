import Post from "@/components/layout/modules/post";
import { getDictionary } from "../../dictionaries";

export default async function Handle({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return <Post dict={dict} lang={lang} />;
}
