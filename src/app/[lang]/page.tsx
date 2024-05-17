import Entry from "../../components/layout/modules/entry";
import { getDictionary } from "./dictionaries";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return <Entry dict={dict} />;
}
