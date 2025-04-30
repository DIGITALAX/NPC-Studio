import NotFoundEntry from "@/app/components/Common/modules/NotFoundEntry";
import Wrapper from "../components/Common/modules/Wrapper";
import { getDictionary } from "../[lang]/dictionaries";

export type tParams = Promise<{ lang: string }>;

export default async function NotFound({ params }: { params: tParams }) {
  const { lang } = await params;

  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <Wrapper page={<NotFoundEntry dict={dict} />} dict={dict}></Wrapper>;
}
