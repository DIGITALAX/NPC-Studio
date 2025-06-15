import Agents from "@/app/components/Index/modules/Agents";
import { tParams } from "../[...notFound]/page";
import { getDictionary } from "../dictionaries";
import { Metadata } from "next";
import { LOCALES } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: "Agent Index",
  alternates: {
    canonical: `https://npcstudio.xyz/agent-index/`,
    languages: LOCALES.reduce((acc, item) => {
      acc[item] = `https://npcstudio.xyz/${item}/agent-index/`;
      return acc;
    }, {} as { [key: string]: string }),
  },
};

export default async function AgentIndex({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <Agents dict={dict} lang={lang} />;
}
