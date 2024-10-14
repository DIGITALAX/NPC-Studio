import { Dictionary, Escena, Sprite } from "@/components/game/types/game.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetStateAction } from "react";
import { Profile } from "../../../../graphql/generated";

export interface Info {
  perfil?: Profile | undefined;
  auEarnedTotal: number;
  auPaidTotal: number;
  activeJobs: number;
  currentWeeklyScore: number;
  currentGlobalScore: number;
  allGlobalScore: number;
  activeWeeks: number;
  rentMissedTotal: number;
}
export type CambioProps = {
  pantallaCambio: Pantalla;
  dict: Dictionary;
  lang: string;
  todosLosNPCs: Sprite[];
  escenas: Escena[];
  mostrarMas: boolean;
  setMostrarMas: (e: SetStateAction<boolean>) => void;
  router: AppRouterInstance;
  npcsCargando: boolean;
  informacion: Info[];
  espectadorInfo: EspectadorInfo;
  isConnected: boolean;
  lensCargando: boolean;
  openConnectModal: (() => void) | undefined;
  manejarLens: () => Promise<void>;
  manejarSalir: () => void;
  lensConectado: Profile | undefined;
  manejarCoger: () => Promise<void>;
  cogerCargando: boolean;
  tokensGuardados: TokensGuardados;
  desafiantes: Desafiante[];
  setDesafiantes: (e: SetStateAction<Desafiante[]>) => void;
  todosLosDesafiantes: Desafiante[];
};

export interface Desafiante {
  etiqueta: string;
  uri: string;
  x: number;
  y: number;
  tapa: string;
  altura: number;
  anchura: number;
  anchura_borde: number;
  altura_borde: number;
  margen: number;
  marco_inicio: number;
  marco_final: number;
  billetera: string;
  prompt: {
    personalidad: string;
    idiomas: string[];
    amigos: number[];
  };
  amigos: (Sprite & { handle: string })[];
  perfil_id: number;
  tapa_dos: string;
  escala: {
    x: number;
    y: number;
  };
  perfil?: Profile | undefined;
  auEarnedTotal: number;
  auPaidTotal: number;
  activeJobs: number;
  currentWeeklyScore: number;
  currentGlobalScore: number;
  allGlobalScore: number;
  activeWeeks: number;
  rentMissedTotal: number;
  rentTransactions: {
    amount: number;
    transactionHash: number;
    blockTimestamp: number;
  }[];
}

export interface TokensGuardados {
  mona: bigint;
  au: bigint;
  delta: bigint;
  genesis: bigint;
  fashion: bigint;
  pode: bigint;
}

export interface EspectadorInfo {
  auEarnedTotal: number;
  weeklyPortion: number;
  auClaimedTotal: number;
  auUnclaimedTotal: number;
  weekWeight: number;
}

export enum Pantalla {
  Puntaje,
  Espectador,
  Tabla,
  Desafiante,
  Juego,
}

export type AgentesProps = {
  todosLosNPCs: Sprite[];
  mostrarMas: boolean;
  dict: Dictionary;
  setMostrarMas: (e: SetStateAction<boolean>) => void;
  router: AppRouterInstance;
  npcsCargando: boolean;
  escenas: Escena[];
  informacion: Info[];
};

export type SeleccionProps = {
  desafiantes: Desafiante[];
  setDesafiantes: (e: SetStateAction<Desafiante[]>) => void;
  todosLosDesafiantes: Desafiante[];
  indice: number;
};
