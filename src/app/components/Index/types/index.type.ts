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

export type CambioProps = {
  setPantallaCambiada: (e: SetStateAction<Pantalla>) => void;
  lang: string;
  agentCollectionsCargando: boolean;
  agentCollections: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[];
  dict: any;
  pantallaCambiada: Pantalla;
};

export type AgentMapProps = {
  agentCollectionsCargando: boolean;
  agentCollections: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[];
  dict: any;
};

export type DesafiantesProps = {
  lang: string;
  dict: any;
  agentCollectionsCargando: boolean;
  agentCollections: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[];
};

export type TickerProps = {
  agentCollections: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[];
  pantalla: boolean;
};

export interface AgentScore {
  npc: string;
  auEarnedTotal?: number;
  auEarnedCurrent?: number;
  scores: Score[];
}

export interface Score {
  npc: string;
  scorerProfile?: Account;
  scorer: string;
  blockTimestamp: string;
  transactionHash: string;
  blockNumber: string;
  metadata: {
    comment: string;
    model: number;
    scene: number;
    chatContext: number;
    appearance: number;
    personality: number;
    training: number;
    lora: number;
    collections: number;
    spriteSheet: number;
    tokenizer: number;
    global: number;
  };
}

export type SeleccionProps = {
  desafiantes: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[];
  setDesafiantes: (
    e: SetStateAction<
      (Sprite & {
        collections?: Coleccion[];
        historial?: AgentScore & {
          stats?: AccountStats;
        };
      })[]
    >
  ) => void;
  agentCollections: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[];
  indice: number;
};

export type DesafianteProps = {
  dict: any;
  indice: number;
  setDesafiantes: (
    e: SetStateAction<
      (Sprite & {
        collections?: Coleccion[];
        historial?: AgentScore & {
          stats?: AccountStats;
        };
      })[]
    >
  ) => void;
  agentCollectionsCargando: boolean;
  agentCollections: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[];
  desafiantes: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[];
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
};

export interface TokensGuardados {
  mona: bigint;
  au: bigint;
  delta: bigint;
  genesis: bigint;
  fashion: bigint;
  pode: bigint;
}

export interface EspectadorInfo {
  initialization: number;
  auEarned: number;
  auClaimed: number;
  auToClaim: number;
}

export type DesafianteInfoProps = {
  dict: any;
  desafiante: Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  };
  escenas: Escena[];
  colorUno: string;
  colorDos: string;
  colorTres: string;
  colorCuatro: string;
  text: string;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
};
