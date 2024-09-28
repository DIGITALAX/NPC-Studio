import {
  ComentarPublicar,
  Dictionary,
} from "@/components/game/types/game.types";
import {
  Comment,
  Mirror,
  Post,
  Profile,
  Quote,
  SimpleCollectOpenActionSettings,
} from "../../../../graphql/generated";
import { SetStateAction } from "react";
import { PublicClient } from "viem";
import { Indexar } from "@/components/common/types/common.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type FeedProps = {
  lensConectado: Profile | undefined;
  dict: Dictionary;
  perfil: Profile | undefined;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  setMostrarInteracciones: (
    e: SetStateAction<{
      tipo: string;
      id?: string;
      abierto: boolean;
    }>
  ) => void;
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
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
  setAbrirCita: (
    e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
  ) => void;
  publicClient: PublicClient;
  address: `0x${string}` | undefined;
  conectado: boolean;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
  setIndexar: (e: SetStateAction<Indexar>) => void;
  openConnectModal: (() => void) | undefined;
  manejarLens: () => Promise<void>;
  router: AppRouterInstance;
};
