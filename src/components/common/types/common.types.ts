import { Dictionary } from "@/components/game/types/game.types";
import { ChangeEvent, SetStateAction } from "react";

export type DropDownProps = {
  titulo: string;
  hashtag?: boolean;
  valor: string;
  manejarCambio?: (e: ChangeEvent) => void;
  estaAbierto: boolean;
  setEstaAbierto: () => void;
  valores: { cover: string; key: string }[];
  manejarElegir: (e: string) => void;
  disabled: boolean;
};

export type ErrorProps = {
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
  dict: Dictionary;
}

export type NotificacionProps = {
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  dict: Dictionary;
  manejarEnviarMensaje: () => Promise<void>;
  mensajeCargando: boolean;
  setMensaje: (e: string) => void;
  mensaje: string;
  tipo: Notificacion;
};

export type IndexProps = {
  dict: Dictionary;
  tipo: Indexar;
};


export enum Notificacion {
  Diseñador,
  Inactivo,
  Creado,
  Añadido,
  GaleriaEliminada,
  ColeccionEliminada,
  Perfil,
}

export enum Indexar {
  Inactivo = "inactivo",
  Exito = "success",
  Indexando = "indexing"
}

export type NotificacionCambioProps = {
  tipo: Notificacion;
  dict: Dictionary;
  manejarEnviarMensaje: () => Promise<void>;
  mensajeCargando: boolean;
  setMensaje: (e: string) => void;
  mensaje: string;
};

export type PantallaComprarProps = {
  setManejarMostrarArticulo: (e: SetStateAction<string | undefined>) => void;
  manejarMostrarArticulo: string | undefined;
};
