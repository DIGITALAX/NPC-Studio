import { SetStateAction } from "react";
import { Coleccion, Escena, Sprite } from "../../Common/types/common.types";
import { Account, AccountStats } from "@lens-protocol/client";

export enum Pantalla {
  Puntaje,
  Espectador,
  Tabla,
  Desafiante,
  Juego,
}

export interface AgentDetails extends Sprite {
  collections?: Coleccion[];
  score?: AgentScore;
  stats?: AccountStats;
}

export type CambioProps = {
  setPantallaCambiada: (e: SetStateAction<Pantalla>) => void;
  lang: string;
  agentCollectionsCargando: boolean;
  agentCollections: AgentDetails[];
  dict: any;
  pantallaCambiada: Pantalla;
};

export type AgentMapProps = {
  agentCollectionsCargando: boolean;
  agentCollections: AgentDetails[];
  dict: any;
};

export type DesafiantesProps = {
  lang: string;
  dict: any;
  agentCollectionsCargando: boolean;
  agentCollections: AgentDetails[];
};

export type TickerProps = {
  agentCollections: AgentDetails[];
};

export interface AgentScore {
  npc: string;
  au: string;
  auTotal: string;
  cycleSpectators: string[];
  activity: Activity[];
}

export interface Activity {
  data: string;
  id: string;
  spectator: string;
  spectatorProfile?: Account;
  blockTimestamp: string;
  spectateMetadata: {
    comment: string;
    model: string;
    scene: string;
    chatContext: string;
    appearance: string;
    collections: string;
    personality: string;
    training: string;
    tokenizer: string;
    lora: string;
    spriteSheet: string;
    global: string;
  };
}

export type SeleccionProps = {
  desafiantes: AgentDetails[];
  setDesafiantes: (e: SetStateAction<AgentDetails[]>) => void;
  agentCollections: AgentDetails[];
  indice: number;
};

export type DesafianteProps = {
  dict: any;
  indice: number;
  setDesafiantes: (e: SetStateAction<AgentDetails[]>) => void;
  agentCollectionsCargando: boolean;
  agentCollections: AgentDetails[];
  desafiantes: AgentDetails[];
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
};

export interface TokensGuardados {
  mona?: bigint;
  au?: bigint;
  delta?: bigint;
  genesis?: bigint;
  fashion?: bigint;
  pode?: bigint;
  tripleA?: bigint;
}

export interface EspectadorInfo {
  initialization: number;
  auEarned: number;
  auClaimed: number;
  auToClaim: number;
}

export type DesafianteInfoProps = {
  dict: any;
  desafiante: AgentDetails;
  escenas: Escena[];
  colorUno: string;
  colorDos: string;
  colorTres: string;
  colorCuatro: string;
  text: string;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
};
