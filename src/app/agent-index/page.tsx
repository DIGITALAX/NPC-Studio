import Agents from "@/app/components/Index/modules/Agents";
import Wrapper from "../components/Common/modules/Wrapper";
import { getDictionary } from "../[lang]/dictionaries";
import { LOCALES } from "../lib/constants";
import { Metadata } from "next";

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

export default async function AgentIndex() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return (
    <Wrapper dict={dict} page={<Agents dict={dict} lang={"en"} />}></Wrapper>
  );
}
