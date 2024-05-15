"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import pick from "lodash/pick";
import { NextIntlClientProvider } from "next-intl";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./../../redux/store";
import { WagmiProvider, http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygon, mainnet } from "wagmi/chains";
import messages from "./../../public/locale/en.json";
import { SetStateAction, createContext, useState } from "react";

const config = getDefaultConfig({
  appName: "NPC Studio",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains: [polygon, mainnet],
  transports: {
    [polygon.id]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export const ModalContext = createContext<
  | {
      artists: number;
      setArtists: (e: SetStateAction<number>) => void;
    }
  | undefined
>(undefined);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [artists, setArtists] = useState<number>(0);

  return (
    <NextIntlClientProvider
      locale="en"
      messages={pick(messages, ["Nav", "Home"])}
      timeZone="America/New_York"
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <ModalContext.Provider value={{ artists, setArtists }}>
              <Provider store={store}>{children}</Provider>
            </ModalContext.Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextIntlClientProvider>
  );
}
