"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygon } from "wagmi/chains";
import { SetStateAction, createContext, useState } from "react";
import { XMTPProvider } from "@xmtp/react-sdk";
import { Indexar, Notificacion } from "@/components/common/types/common.types";
import {
  Comment,
  Mirror,
  Post,
  Profile,
  Quote,
  SimpleCollectOpenActionSettings,
} from "../../graphql/generated";
import {
  Coleccion,
  ComentarPublicar,
  DatosOraculos,
  Escena,
} from "@/components/game/types/game.types";
import { Compra } from "@/components/compras/types/compras.types";
import { LitNodeClient } from "@lit-protocol/lit-node-client";

const config = getDefaultConfig({
  appName: "NPC Studio",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains: [polygon],
  transports: {
    // [polygonAmoy.id]: http(
    //   `https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_AMOY_KEY}`
    // ),
    [polygon.id]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export const ModalContext = createContext<
  | {
      setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
      mostrarPerfil: string | undefined;
      mint: number;
      setMint: (e: SetStateAction<number>) => void;
      pantalla: number;
      setPantalla: (e: SetStateAction<number>) => void;
      esArtista: boolean;
      setEsArtista: (e: SetStateAction<boolean>) => void;
      lensConectado: Profile | undefined;
      setLensConectado: (e: SetStateAction<Profile | undefined>) => void;
      mostrarNotificacion: Notificacion;
      setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
      oraculos: DatosOraculos[];
      setOraculos: (e: SetStateAction<DatosOraculos[]>) => void;
      indexar: Indexar;
      setIndexar: (e: SetStateAction<Indexar>) => void;
      errorInteraccion: boolean;
      setErrorInteraccion: (e: SetStateAction<boolean>) => void;
      abrirCita: Quote | Post | Comment | Mirror | undefined;
      cliente: LitNodeClient;
      setAbrirCita: (
        e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
      ) => void;
      seguirColeccionar:
        | {
            tipo: string;
            collecionar: {
              id: string;
              stats: number;
              item: SimpleCollectOpenActionSettings;
            };
            seguidor: Profile;
          }
        | undefined;
      setSeguirColeccionar: (
        e: SetStateAction<
          | {
              tipo: string;
              collecionar: {
                id: string;
                stats: number;
                item: SimpleCollectOpenActionSettings;
              };
              seguidor: Profile;
            }
          | undefined
        >
      ) => void;
      verImagen: {
        abierto: boolean;
        tipo: string;
        url: string;
      };
      setVerImagen: (
        e: SetStateAction<{
          abierto: boolean;
          tipo: string;
          url: string;
        }>
      ) => void;
      carrito: {
        compras: Compra[];
        abierto: boolean;
      };
      setCarrito: (
        e: SetStateAction<{
          compras: Compra[];
          abierto: boolean;
        }>
      ) => void;
      comentarPublicar: ComentarPublicar[];
      setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
      escenas: Escena[];
      setEscenas: (e: SetStateAction<Escena[]>) => void;
      mostrarInteracciones: {
        tipo: string;
        id?: string;
        abierto: boolean;
      };
      setMostrarInteracciones: (
        e: SetStateAction<{
          tipo: string;
          id?: string;
          abierto: boolean;
        }>
      ) => void;
      coleccionActual: Coleccion;
      setColeccionActual: (e: SetStateAction<Coleccion>) => void;
      setConectarPub: (e: SetStateAction<boolean>) => void;
      conectarPub: boolean;
      escena: undefined | string;
      setEscena: (e: SetStateAction<undefined | string>) => void;
      voto: boolean;
      setVoto: (e: SetStateAction<boolean>) => void;
    }
  | undefined
>(undefined);

export default function Providers({ children }: { children: React.ReactNode }) {
  const cliente = new LitNodeClient({ litNetwork: "cayenne", debug: false });
  const [mint, setMint] = useState<number>(1);
  const [pantalla, setPantalla] = useState<number>(0);
  const [mostrarPerfil, setMostrarPerfil] = useState<string | undefined>();
  const [esArtista, setEsArtista] = useState<boolean>(false);
  const [mostrarNotificacion, setMostrarNotificacion] = useState<Notificacion>(
    Notificacion.Inactivo
  );
  const [escena, setEscena] = useState<string>();
  const [coleccionActual, setColeccionActual] = useState<Coleccion>({
    imagen: "",
    cantidad: 1,
    imagenes: Array.from({ length: 3 }, () => ""),
    tokenes: [],
    precio: 0,
    colors: ["black", "white"],
    id: 0,
    tipo: "NFT" as any,
    titulo: "",
    descripcion: "",
    etiquetas: "",
    npcIdiomas: "",
    npcInstrucciones: "",
    npcs: "",
    galeria: "",
    tokenesMinteados: [],
    profileIds: [],
    pubIds: [],
    profile: undefined,
  });
  const [comentarPublicar, setComentarPublicar] = useState<ComentarPublicar[]>([
    {
      contenido: "",
      imagenes: [],
      videos: [],
      gifs: [],
    },
  ]);
  const [lensConectado, setLensConectado] = useState<Profile | undefined>();
  const [oraculos, setOraculos] = useState<DatosOraculos[]>([]);
  const [errorInteraccion, setErrorInteraccion] = useState<boolean>(false);
  const [indexar, setIndexar] = useState<Indexar>(Indexar.Inactivo);
  const [conectarPub, setConectarPub] = useState<boolean>(false);
  const [mostrarInteracciones, setMostrarInteracciones] = useState<{
    tipo: string;
    id?: string;
    abierto: boolean;
  }>({
    tipo: "",
    abierto: false,
  });
  const [verImagen, setVerImagen] = useState<{
    abierto: boolean;
    tipo: string;
    url: string;
  }>({
    abierto: false,
    tipo: "",
    url: "",
  });
  const [carrito, setCarrito] = useState<{
    compras: Compra[];
    abierto: boolean;
  }>({
    compras: [],
    abierto: false,
  });
  const [escenas, setEscenas] = useState<Escena[]>([]);
  const [abrirCita, setAbrirCita] = useState<
    Quote | Post | Comment | Mirror | undefined
  >();
  const [voto, setVoto] = useState<boolean>(false);
  const [seguirColeccionar, setSeguirColeccionar] = useState<
    | {
        tipo: string;
        collecionar: {
          id: string;
          stats: number;
          item: SimpleCollectOpenActionSettings;
        };
        seguidor: Profile;
      }
    | undefined
  >();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <XMTPProvider dbVersion={2}>
            <ModalContext.Provider
              value={{
                escena,
                setEscena,
                voto,
                setVoto,
                mint,
                setMint,
                conectarPub,
                setConectarPub,
                coleccionActual,
                setColeccionActual,
                verImagen,
                setVerImagen,
                mostrarPerfil,
                setMostrarPerfil,
                setComentarPublicar,
                comentarPublicar,
                pantalla,
                mostrarInteracciones,
                setMostrarInteracciones,
                setPantalla,
                esArtista,
                setEsArtista,
                escenas,
                setEscenas,
                mostrarNotificacion,
                setMostrarNotificacion,
                lensConectado,
                setLensConectado,
                setOraculos,
                oraculos,
                errorInteraccion,
                setErrorInteraccion,
                indexar,
                setIndexar,
                abrirCita,
                setAbrirCita,
                seguirColeccionar,
                setSeguirColeccionar,
                carrito,
                setCarrito,
                cliente,
              }}
            >
              {children}
            </ModalContext.Provider>
          </XMTPProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
