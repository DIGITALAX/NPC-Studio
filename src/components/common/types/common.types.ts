import {
  AutographType,
  Coleccion,
  ComentarPublicar,
  DatosOraculos,
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
import {
  Catalogo,
  Compra,
  Details,
  Mezcla,
} from "@/components/compras/types/compras.types";

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
  Comprado,
  Cumplimiento,
  Campos
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
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          disenador: string;
          tipo: AutographType;
        }
      | undefined
    >
  ) => void;
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        disenador: string;
        tipo: AutographType;
      }
    | undefined;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  comprarPublicacion: (articulo: Compra) => Promise<void>;
  carritoCargando: boolean;
  articuloCargando: boolean;
  dict: Dictionary;
  aprobarCargando: boolean;
  cumplimiento: Details;
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
  carrito: {
    compras: Compra[];
    abierto: boolean;
  };
  datosOraculos: DatosOraculos[];
  gastosAprobados: { token: string; aprobado: boolean }[];
  articuloIndice: number;
  setCumplimiento: (e: SetStateAction<Details>) => void;
  setArticuloIndice: (e: SetStateAction<number>) => void;
  aprobarGastos: (
    token: string,
    precio: number,
    indice: number
  ) => Promise<void>;
  articulosActuales: Catalogo[] | Coleccion[] | undefined;
  articuloSeleccionado: Compra[];
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  comprarCarrito: () => Promise<void>;
  pagina: number;
  setPagina: (e: SetStateAction<number>) => void;
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
  elementoTexto: RefObject<HTMLTextAreaElement>;
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

export type CarritoAbiertoProps = {
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  carrito: {
    compras: Compra[];
    abierto: boolean;
  };
  comprarCarrito: () => Promise<void>;
  dict: Dictionary;
  setCumplimiento: (e: SetStateAction<Details>) => void;
  cumplimiento: Details;
  datosOraculos: DatosOraculos[];
  carritoCargando: boolean;
  aprobarCargando: boolean;
  gastosAprobados: { token: string; aprobado: boolean }[];
  aprobarGastos: (
    token: string,
    precio: number,
    indice: number
  ) => Promise<void>;
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

export type ModalsProps = {
  dict: Dictionary;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
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
  coleccionActual: Coleccion;
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  mensajeCargando: boolean;
  manejarEnviarMensaje: () => Promise<void>;
  setMensaje: (e: SetStateAction<string>) => void;
  mensaje: string;
  errorInteraccion: boolean;
  indexar: Indexar;
  hacerPublicacion: () => Promise<void>;
  conectarPub: boolean;
  mostrarNotificacion: Notificacion;
  setConectarPub: (e: SetStateAction<boolean>) => void;
  cargandoConexion: boolean;
  setPerfilesAbiertos: (e: SetStateAction<boolean[]>) => void;
  setMencionarPerfiles: (e: SetStateAction<Profile[]>) => void;
  lensConectado: Profile | undefined;
  setCaretCoord: (e: SetStateAction<{ x: number; y: number }[]>) => void;
  elementoTexto: RefObject<HTMLTextAreaElement>;
  descripcion: string;
  setDescripcion: (e: SetStateAction<string>) => void;
  caretCoord: { x: number; y: number }[];
  perfilesAbiertos: boolean[];
  mencionarPerfiles: Profile[];
};

export type PublicacionConectadaProps = {
  setConectarPub: (e: SetStateAction<boolean>) => void;
  hacerPublicacion: () => Promise<void>;
  coleccionActual: Coleccion;
  cargandoConexion: boolean;
  setPerfilesAbiertos: (e: SetStateAction<boolean[]>) => void;
  setMencionarPerfiles: (e: SetStateAction<Profile[]>) => void;
  lensConectado: Profile | undefined;
  setCaretCoord: (e: SetStateAction<{ x: number; y: number }[]>) => void;
  elementoTexto: RefObject<HTMLTextAreaElement>;
  dict: Dictionary;
  descripcion: string;
  setDescripcion: (e: SetStateAction<string>) => void;
  caretCoord: { x: number; y: number }[];
  perfilesAbiertos: boolean[];
  mencionarPerfiles: Profile[];
};
