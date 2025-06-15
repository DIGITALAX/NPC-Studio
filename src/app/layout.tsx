import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Animation from "./components/Common/modules/Animation";
import Footer from "./components/Common/modules/Footer";
import { LOCALES } from "./lib/constants";

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
  twitter: {
    card: "summary_large_image",
    site: "@digitalax_",
    title: "NPC Studio",
    description:
      "Equip your AI workforce. Train for less idle time. Try to survive in style.",
  },
  openGraph: {
    title: "NPC Studio",
    description:
      "Equip your AI workforce. Train for less idle time. Try to survive in style.",
  },
  alternates: {
    canonical: `https://npcstudio.xyz/`,
    languages: LOCALES.reduce((acc, item) => {
      acc[item] = `https://npcstudio.xyz/${item}/`;
      return acc;
    }, {} as { [key: string]: string }),
  },
  creator: "Emma-Jane MacKinnon-Lee",
  publisher: "Emma-Jane MacKinnon-Lee",
  keywords: [
    "Web3",
    "Web3 Fashion",
    "Moda Web3",
    "Open Source",
    "CC0",
    "Emma-Jane MacKinnon-Lee",
    "Open Source LLMs",
    "DIGITALAX",
    "F3Manifesto",
    "www.digitalax.xyz",
    "www.f3manifesto.xyz",
    "Women",
    "Life",
    "Freedom",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          <Animation>
            {children}
            <Footer />
          </Animation>
        </Providers>
      </body>
    </html>
  );
}
