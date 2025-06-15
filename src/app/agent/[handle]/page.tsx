import { getDictionary } from "@/app/[lang]/dictionaries";
import Agent from "@/app/components/Agent/modules/Agent";
import Wrapper from "@/app/components/Common/modules/Wrapper";
import { LOCALES } from "@/app/lib/constants";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{
    handle: string;
  }>;
}): Promise<Metadata> => {
  const { handle } = await params;

  return {
    title: `Agent | ${handle}`,
    alternates: {
      canonical: `https://npcstudio.xyz/autograph/agent/${handle}/`,
      languages: LOCALES.reduce((acc, item) => {
        acc[item] = `https://npcstudio.xyz/${item}/agent/${handle}/`;
        return acc;
      }, {} as { [key: string]: string }),
    },
  };
};

export default async function Handle() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return <Wrapper page={<Agent dict={dict} />} dict={dict}></Wrapper>;
}
