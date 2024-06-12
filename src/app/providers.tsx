"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { WagmiProvider, http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygon, polygonAmoy } from "wagmi/chains";
import { SetStateAction, createContext, useState } from "react";
import { XMTPProvider } from "@xmtp/react-sdk";

const config = getDefaultConfig({
  appName: "NPC Studio",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains: [polygon, polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(
      `https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_AMOY_KEY}`
    ),
    [polygon.id]: http(
      `https://polygon.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export const ModalContext = createContext<
  | {
      mint: number;
      setMint: (e: SetStateAction<number>) => void;
      pantalla: number;
      setPantalla: (e: SetStateAction<number>) => void;
      esArtista: boolean;
      setEsArtista: (e: SetStateAction<boolean>) => void;
      lensConectado: boolean;
      setLensConectado: (e: SetStateAction<boolean>) => void;
      mostrarNotificacion: boolean;
      setMostrarNotificacion: (e: SetStateAction<boolean>) => void;
    }
  | undefined
>(undefined);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mint, setMint] = useState<number>(3);
  const [pantalla, setPantalla] = useState<number>(1);
  const [esArtista, setEsArtista] = useState<boolean>(false);
  const [mostrarNotificacion, setMostrarNotificacion] =
    useState<boolean>(false);
  const [lensConectado, setLensConectado] = useState<boolean>(false);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <XMTPProvider dbVersion={2}>
            <ModalContext.Provider
              value={{
                mint,
                setMint,
                pantalla,
                setPantalla,
                esArtista,
                setEsArtista,
                mostrarNotificacion,
                setMostrarNotificacion,
                lensConectado,
                setLensConectado,
              }}
            >
              <Provider store={store}>{children}</Provider>
            </ModalContext.Provider>
          </XMTPProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
