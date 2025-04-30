import { getDictionary } from "@/app/[lang]/dictionaries";
import Agent from "@/app/components/Agent/modules/Agent";
import Wrapper from "@/app/components/Common/modules/Wrapper";

export default async function Handle() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return <Wrapper page={<Agent dict={dict} />} dict={dict}></Wrapper>;
}
