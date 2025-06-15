import Agent from "@/app/components/Agent/modules/Agent";
import { tParams } from "../../[...notFound]/page";
import { getDictionary } from "../../dictionaries";
import { Metadata } from "next";
import { LOCALES } from "@/app/lib/constants";

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

export default async function Handle({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <Agent dict={dict} />;
}
