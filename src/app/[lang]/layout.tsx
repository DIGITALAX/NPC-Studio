import "@rainbow-me/rainbowkit/styles.css";
import "./../../globals.css";
import type { Metadata } from "next";
import Footer from "./../../components/layout/modules/Footer";
import Providers from "../providers";
import Cargando from "@/components/common/modules/Cargando";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.npcstudio.xyz"),
  title: "NPC Studio",
  robots: {
    googleBot: {
      index: true,
      follow: true,
    },
  },
  description:
    "Equip your AI workforce. Train for less idle time. Try to survive in style.",
  keywords:
    "Web3, Web3 Fashion, Moda Web3, Open Source, CC0, Emma-Jane MacKinnon-Lee, Open Source LLMs, DIGITALAX, F3Manifesto, www.digitalax.xyz, www.f3manifesto.xyz, Women, Life, Freedom.",
  twitter: {
    card: "summary_large_image",
    site: "@digitalax_",
    title: "NPC Studio",
    description:
      "Equip your AI workforce. Train for less idle time. Try to survive in style.",
    images: ["https://www.npcstudio.xyz/card.png/"],
  },

  openGraph: {
    title: "NPC Studio",
    description:
      "Equip your AI workforce. Train for less idle time. Try to survive in style.",
    images: "https://www.npcstudio.xyz/card.png/",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>
        <Providers>
          <Cargando />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
