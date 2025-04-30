import { tParams } from "./[...notFound]/page";
import Modals from "../components/Modals/modules/Modals";
import Footer from "../components/Common/modules/Footer";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: tParams;
}) {
  return (
    <>
      {children}
      <Modals params={params} />
    </>
  );
}
