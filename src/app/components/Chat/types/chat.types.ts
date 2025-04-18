import { Account, Post } from "@lens-protocol/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChangeEvent, SetStateAction } from "react";

export type PublicacionProps = {
  elemento: Post;
  dict: any;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  router: AppRouterInstance;
  indice: number;
  comentariosAbiertos: boolean[];
  setComentariosAbiertos: (e: SetStateAction<boolean[]>) => void;
  llamarFeed: () => Promise<void>;
};

export type ChatProps = {
  dict: any;
  abierto: boolean;
  router: AppRouterInstance;
};

export type TiposPublicacionesProps = {
  elemento: Post;
};

export type OlaProps = {
  clave: string;
  audio: string;
  video: string;
  tipo: string;
  subido?: boolean;
  manejarMedios?: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  manejarVideoEmpezado?: () => void;
  manejarVideoPausado?: () => void;
  manejarVideoBuscado?: (e: number) => void;
  informacionVideo?: {
    empezado: boolean;
    horaActual: number;
    duracion: number;
  };
};

export type MediosCambioProps = {
  tipo: string;
  fuenteUrl: string;
  fuenteFondo?: string;
  classNameVideo?: React.CSSProperties;
  classNameImagen?: string;
  classNameAudio?: string;
  ola?: boolean;
};

export type CitaProps = {
  cita: Post;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
};

export type ComentarioProps = {
  dict: any;
  cita: boolean;
  indice: number;
  comentarioId?: string;
  llamarFeed?: () => Promise<void>;
};

export type BarProps = {
  indice: number;
  elemento: Post;
  dict: any;
  setComentariosAbiertos: (e: SetStateAction<boolean[]>) => void;
};
