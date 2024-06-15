import {
  ComentarPublicar,
  Dictionary,
} from "@/components/game/types/game.types";
import { ChangeEvent, RefObject, SetStateAction } from "react";
import {
  ArticleMetadataV3,
  Comment,
  ImageMetadataV3,
  Mirror,
  OpenActionModule,
  Post,
  Profile,
  Quote,
  StoryMetadataV3,
  TextOnlyMetadataV3,
  VideoMetadataV3,
} from "../../../../graphql/generated";

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
  Indexando = "indexing",
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

export type PublicacionProps = {
  setCaretCoord: (e: SetStateAction<{ x: number; y: number }[]>) => void;
  caretCoord: { x: number; y: number }[];
  publicacion: Quote | Mirror | Comment | Post;
  dict: Dictionary;
  comentariosAbiertos: boolean[];
  setComentariosAbiertos: (e: SetStateAction<boolean[]>) => void;
  indice: number;
  abrirMirrorEleccion: boolean[];
  setAbrirMirrorEleccion: (e: SetStateAction<boolean[]>) => void;
  cargandoInteracciones: {
    gusta: boolean;
    espejo: boolean;
    coleccion: boolean;
  };
  setAbrirCita: (e: SetStateAction<Quote | undefined>) => void;
  manejarMeGusta: (
    id: string,
    hasReacted: boolean,
    indice: number
  ) => Promise<void>;
  manejarMirror: (id: string, indice: number) => Promise<void>;
  manejarColeccionar: (
    id: string,
    tipo: string,
    indice: number
  ) => Promise<void>;
  setSeguirColeccionar: (
    e: SetStateAction<
      | {
          tipo: string;
          collecionar: {
            id: string;
            stats: number;
            item: OpenActionModule;
          };
          seguidor: Profile;
        }
      | undefined
    >
  ) => void;
  lensConectado: Profile | undefined;
  setPerfilesAbiertos: (e: SetStateAction<boolean[]>) => void;
  setMencionarPerfiles: (e: SetStateAction<Profile[]>) => void;
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  perfilesAbiertos: boolean[];
  manejarPublicar: (indice: number, comentarioId?: string) => Promise<void>;
  comentarPublicar: ComentarPublicar[];
  mencionarPerfiles: Profile[];
  publicacionCargando: boolean;
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
};

export type TiposPublicacionesProps = {
  elemento: Post | Mirror | Comment | Quote;
  setVerImagen?: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
};

export type TextoProps = {
  metadata: ArticleMetadataV3 | StoryMetadataV3 | TextOnlyMetadataV3;
};

export type MediosProps = {
  metadata: ImageMetadataV3 | VideoMetadataV3;
  setVerImagen?: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
};

export type MediosCambioProps = {
  tipo: string;
  fuenteUrl: string;
  fuenteFondo?: string;
  classNameVideo?: React.CSSProperties;
  classNameImagen?: string;
  classNameAudio?: string;
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

export type CitaProps = {
  cita: Quote;
};

export type BarProps = {
  indice: number;
  elemento: Post | Mirror | Comment | Quote;
  setAbrirMirrorEleccion: (e: SetStateAction<boolean[]>) => void;
  abrirMirrorEleccion: boolean[];
  cargandoInteracciones: {
    gusta: boolean;
    espejo: boolean;
    coleccion: boolean;
  };
  setComentariosAbiertos: (e: SetStateAction<boolean[]>) => void;
  setAbrirCita: (e: SetStateAction<Quote | undefined>) => void;
  manejarMeGusta: (
    id: string,
    hasReacted: boolean,
    indice: number
  ) => Promise<void>;
  manejarMirror: (id: string, indice: number) => Promise<void>;
  manejarColeccionar: (
    id: string,
    tipo: string,
    indice: number
  ) => Promise<void>;
  setSeguirColeccionar: (
    e: SetStateAction<
      | {
          tipo: string;
          collecionar: {
            id: string;
            stats: number;
            item: OpenActionModule;
          };
          seguidor: Profile;
        }
      | undefined
    >
  ) => void;
};

export type ComentarioProps = {
  lensConectado: Profile | undefined;
  indice: number;
  setPerfilesAbiertos: (e: SetStateAction<boolean[]>) => void;
  setMencionarPerfiles: (e: SetStateAction<Profile[]>) => void;
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  perfilesAbiertos: boolean[];
  caretCoord: {
    x: number;
    y: number;
  }[];
  elementoTexto: RefObject<HTMLTextAreaElement>
  comentarioId?: string;
  manejarPublicar: (indice: number, comentarioId?: string) => Promise<void>;
  setCaretCoord: (
    e: SetStateAction<
      {
        x: number;
        y: number;
      }[]
    >
  ) => void;
  comentarPublicar: ComentarPublicar[];
  mencionarPerfiles: Profile[];
  dict: Dictionary;
  publicacionCargando: boolean;
};
