"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { Context, mainnet, Post, PublicClient } from "@lens-protocol/client";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { StorageClient } from "@lens-chain/storage-client";
import {
  Coleccion,
  ComentarPublicar,
  Compra,
  DatosOraculos,
  Escena,
  Indexar,
  LensConnected,
} from "./components/Common/types/common.types";
import { Notificacion } from "./components/Modals/types/modals.types";
import { chains } from "@lens-chain/sdk/viem";

export const config = createConfig(
  getDefaultConfig({
    appName: "NPC Studio",
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    appUrl: "https://npcstudio.xyz",
    appIcon: "https://npcstudio.xyz/favicon.ico",
    chains: [chains.mainnet],
    transports: {
      [chains.mainnet.id]: http("https://rpc.lens.xyz"),
    },
    ssr: true,
  })
);

const queryClient = new QueryClient();

export const ModalContext = createContext<
  | {
      clienteLens: PublicClient<Context> | undefined;
      clienteAlmacenamiento: StorageClient;
      lensConectado: LensConnected | undefined;
      citaAbierta: { open: boolean; post?: Post };
      setCitaAbierta: (
        e: SetStateAction<{ open: boolean; post?: Post }>
      ) => void;
      setLensConectado: (e: SetStateAction<LensConnected | undefined>) => void;
      error: string | undefined;
      setError: (e: SetStateAction<string | undefined>) => void;
      setConnect: (e: SetStateAction<boolean>) => void;
      connect: boolean;
      setCrearCuenta: (e: SetStateAction<boolean>) => void;
      crearCuenta: boolean;
      pantalla: number;
      setPantalla: (e: SetStateAction<number>) => void;
      voto:
        | {
            mensaje: string;
            tokens?: {
              titulo: string;
              enlace: string;
              tapa: string;
              cantidad: number;
              umbral: number;
            }[];
          }
        | undefined;
      setVoto: (
        e: SetStateAction<
          | {
              mensaje: string;
              tokens?: {
                titulo: string;
                enlace: string;
                tapa: string;
                cantidad: number;
                umbral: number;
              }[];
            }
          | undefined
        >
      ) => void;
      signless: boolean;
      setSignless: (e: SetStateAction<boolean>) => void;
      esArtista: boolean;
      setEsArtista: (e: SetStateAction<boolean>) => void;
      setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
      mostrarPerfil: string | undefined;
      mint: number;
      setMint: (e: SetStateAction<number>) => void;
      oraculos: DatosOraculos[];
      setOraculos: (e: SetStateAction<DatosOraculos[]>) => void;
      simpleCollect: { open: boolean; post?: Post };
      setSimpleCollect: (
        e: SetStateAction<{ open: boolean; post?: Post }>
      ) => void;
      gifs: { open: boolean; index: number };
      setGifs: (e: SetStateAction<{ open: boolean; index: number }>) => void;
      collectOptions: { open: boolean; index: number };
      setCollectOptions: (
        e: SetStateAction<{ open: boolean; index: number }>
      ) => void;
      mostrarNotificacion: Notificacion;
      setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
      indexar: Indexar;
      setIndexar: (e: SetStateAction<Indexar>) => void;
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
      escenas: Escena[];
      setEscenas: (e: SetStateAction<Escena[]>) => void;
      coleccionActual: Coleccion;
      setColeccionActual: (e: SetStateAction<Coleccion>) => void;
      setConectarPub: (e: SetStateAction<boolean>) => void;
      conectarPub: boolean;
      escena: undefined | string;
      setEscena: (e: SetStateAction<undefined | string>) => void;
      comentarPublicar: ComentarPublicar[];
      setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
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
      galeriaActual:
        | {
            title: string;
            image: string;
          }
        | undefined;
      setGaleriaActual: (
        e: SetStateAction<
          | {
              title: string;
              image: string;
            }
          | undefined
        >
      ) => void;
    }
  | undefined
>(undefined);

export const AnimationContext = createContext<
  | {
      pageChange: boolean;
      setPageChange: (e: SetStateAction<boolean>) => void;
    }
  | undefined
>(undefined);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [clienteLens, setClienteLens] = useState<PublicClient | undefined>();
  const [gifs, setGifs] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });
  const [simpleCollect, setSimpleCollect] = useState<{
    open: boolean;
    post?: Post;
  }>({
    open: false,
  });
  const [mostrarNotificacion, setMostrarNotificacion] = useState<Notificacion>(
    Notificacion.Inactivo
  );
  const [verImagen, setVerImagen] = useState<{
    abierto: boolean;
    tipo: string;
    url: string;
  }>({
    abierto: false,
    tipo: "",
    url: "",
  });
  const [mostrarInteracciones, setMostrarInteracciones] = useState<{
    tipo: string;
    id?: string;
    abierto: boolean;
  }>({
    tipo: "",
    abierto: false,
  });
  const [carrito, setCarrito] = useState<{
    compras: Compra[];
    abierto: boolean;
  }>({
    compras: [],
    abierto: false,
  });
  const [citaAbierta, setCitaAbierta] = useState<{
    open: boolean;
    post?: Post;
  }>({
    open: false,
  });
  const [escenas, setEscenas] = useState<Escena[]>([]);
  const clienteAlmacenamiento = StorageClient.create();
  const [lensConectado, setLensConectado] = useState<LensConnected>();
  const [signless, setSignless] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [connect, setConnect] = useState<boolean>(false);
  const [crearCuenta, setCrearCuenta] = useState<boolean>(false);
  const [voto, setVoto] = useState<
    | {
        mensaje: string;
        tokens?: {
          titulo: string;
          enlace: string;
          tapa: string;
          cantidad: number;
          umbral: number;
        }[];
      }
    | undefined
  >();
  const [collectOptions, setCollectOptions] = useState<{
    open: boolean;
    index: number;
  }>({ open: false, index: 0 });
  const [pantalla, setPantalla] = useState<number>(0);
  const [indexar, setIndexar] = useState<Indexar>(Indexar.Inactivo);
  const [conectarPub, setConectarPub] = useState<boolean>(false);
  const [oraculos, setOraculos] = useState<DatosOraculos[]>([]);
  const [escena, setEscena] = useState<string>();
  const [coleccionActual, setColeccionActual] = useState<Coleccion>({
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
    npcInstrucciones: "",
    npcs: "",
    tokenesMinteados: [],
    postIds: [],
    profile: undefined,
  });
  const [galeriaActual, setGaleriaActual] = useState<{
    title: string;
    image: string;
  }>();
  const [pageChange, setPageChange] = useState<boolean>(false);
  const [mostrarPerfil, setMostrarPerfil] = useState<string | undefined>();
  const [esArtista, setEsArtista] = useState<boolean>(false);
  const [mint, setMint] = useState<number>(1);
  const [comentarPublicar, setComentarPublicar] = useState<ComentarPublicar[]>([
    {
      contenido: "",
      imagenes: [],
      videos: [],
      gifs: [],
    },
  ]);

  useEffect(() => {
    if (!clienteLens) {
      setClienteLens(
        PublicClient.create({
          environment: mainnet,
          storage: window.localStorage,
        })
      );
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            "--ck-font-family": '"Manaspace", cursive',
          }}
        >
          <AnimationContext.Provider
            value={{
              pageChange,
              setPageChange,
            }}
          >
            <ModalContext.Provider
              value={{
                mostrarNotificacion,
                setMostrarNotificacion,
                gifs,
                setGifs,
                citaAbierta,
                setCitaAbierta,
                simpleCollect,
                setSimpleCollect,
                collectOptions,
                setCollectOptions,
                clienteLens,
                clienteAlmacenamiento,
                lensConectado,
                setLensConectado,
                error,
                setError,
                connect,
                setConnect,
                crearCuenta,
                setCrearCuenta,
                pantalla,
                setPantalla,
                signless,
                setSignless,
                voto,
                setVoto,
                comentarPublicar,
                setComentarPublicar,
                escenas,
                mostrarInteracciones,
                setMostrarInteracciones,
                setCarrito,
                setVerImagen,
                setEscenas,
                verImagen,
                carrito,
                esArtista,
                escena,
                setColeccionActual,
                setConectarPub,
                setEscena,
                setEsArtista,
                setIndexar,
                setMint,
                setMostrarPerfil,
                setOraculos,
                oraculos,
                mint,
                mostrarPerfil,
                indexar,
                coleccionActual,
                conectarPub,
                setGaleriaActual,
                galeriaActual,
              }}
            >
              {children}
            </ModalContext.Provider>
          </AnimationContext.Provider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
