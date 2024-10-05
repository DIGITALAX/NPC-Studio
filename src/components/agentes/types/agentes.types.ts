import { Dictionary, Escena, Sprite } from "@/components/game/types/game.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetStateAction } from "react";
import { Profile } from "../../../../graphql/generated";

export interface Info {
  perfil: Profile | undefined;
  auEarned: number;
  activeJobs: number;
  currentScore: number;
  rentPaid: number;
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
};

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
