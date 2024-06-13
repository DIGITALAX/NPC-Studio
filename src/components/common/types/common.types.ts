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

export type NotificacionProps = {
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  dict: Dictionary;
  manejarEnviarMensaje: () => Promise<void>;
  mensajeCargando: boolean;
  setMensaje: (e: string) => void;
  mensaje: string;
  tipo: Notificacion;
};

export enum Notificacion {
  Diseñador,
  Inactivo,
  Creado,
  Añadido,
  GaleriaEliminada,
  ColeccionEliminada,
}

export type NotificacionCambioProps = {
  tipo: Notificacion;
  dict: Dictionary;
  manejarEnviarMensaje: () => Promise<void>;
  mensajeCargando: boolean;
  setMensaje: (e: string) => void;
  mensaje: string;
};
