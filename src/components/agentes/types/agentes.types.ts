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
};

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
