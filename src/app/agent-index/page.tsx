import Agents from "@/app/components/Index/modules/Agents";
import Wrapper from "../components/Common/modules/Wrapper";
import { getDictionary } from "../[lang]/dictionaries";

export default async function AgentIndex() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return (
    <Wrapper dict={dict} page={<Agents dict={dict} lang={"en"} />}></Wrapper>
  );
}
