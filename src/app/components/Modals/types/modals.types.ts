import { SetStateAction } from "react";
import {
  Indexar,
  LensConnected,
  Sprite,
} from "../../Common/types/common.types";
import { Account, AccountStats } from "@lens-protocol/client";

export type ErrorProps = {
  setError: (e: SetStateAction<string | undefined>) => void;
  error: string;
};

export type SignlessProps = {
  setSignless: (e: SetStateAction<boolean>) => void;
  dict: any;
};

export type IndexProps = {
  dict: any;
  tipo: Indexar;
};

export type VerMediosProps = {
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
  verImagen: {
    abierto: boolean;
    tipo: string;
    url: string;
  };
};

export type CrearCuentaProps = {
  setCreateAccount: (e: SetStateAction<boolean>) => void;
  dict: any;
};

export type CuentaProps = {
  dict: any;
  perfil: {
    account: Account;
    sprite?: Sprite;
    stats?: AccountStats;
  };
  seguirCargando: boolean;
  seguirNpc: () => Promise<void>;
  dejarNpc: () => Promise<void>;
  npcCargando: boolean;
};

export type PerfileProps = {
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  dict: any;
};

export type ConnectProps = {
  dict: any;
  setConnect: (e: SetStateAction<boolean>) => void;
  lensConectado: LensConnected | undefined;
};

export enum Notificacion {
  Diseñador,
  Inactivo,
  Creado,
  Añadido,
  GaleriaEliminada,
  ColeccionEliminada,
  Comprado,
  Cumplimiento,
  Campos,
  Agotado,
}

export type NotificacionCambioProps = {
  dict: any;
  tipo: Notificacion;
};

export type NotificacionProps = {
  dict: any;
};
