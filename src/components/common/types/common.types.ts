import {
  AutographType,
  Coleccion,
  ComentarPublicar,
  DatosOraculos,
  Dictionary,
  Escena,
} from "@/components/game/types/game.types";
import { ChangeEvent, RefObject, SetStateAction } from "react";
import {
  ArticleMetadataV3,
  Comment,
  Erc20,
  ImageMetadataV3,
  Mirror,
  Post,
  Profile,
  Quote,
  SimpleCollectOpenActionSettings,
  StoryMetadataV3,
  TextOnlyMetadataV3,
  VideoMetadataV3,
} from "../../../../graphql/generated";
import {
  Catalogo,
  Compra,
  Details,
} from "@/components/compras/types/compras.types";
import { PublicClient } from "viem";

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
  idiomas?: boolean;
  dict?: Dictionary;
};

export type OpcionAbiertaProps = {
  dict: Dictionary;
  gifCargando: boolean;
  monedasDisponibles: Erc20[];
  setDrops: (
    e: SetStateAction<{
      award: string;
      whoCollectsOpen: boolean;
      creatorAwardOpen: boolean;
      currencyOpen: boolean;
      editionOpen: boolean;
      edition: string;
      timeOpen: boolean;
      time: string;
    }>
  ) => void;
  drops: {
    award: string;
    whoCollectsOpen: boolean;
    creatorAwardOpen: boolean;
    currencyOpen: boolean;
    editionOpen: boolean;
    edition: string;
    timeOpen: boolean;
    time: string;
  };
  buscarGifs: {
    search: string;
    gifs: any[];
  };
  setBuscarGifs: (
    e: SetStateAction<{
      search: string;
      gifs: any[];
    }>
  ) => void;
  manejarGif: (e: string) => Promise<void>;
  setOpcionAbierta: (
    e: SetStateAction<
      | {
          tipo: string;
          indice: number;
        }
      | undefined
    >
  ) => void;
  opcionAbierta:
    | {
        tipo: string;
        indice: number;
      }
    | undefined;
  comentarPublicar: ComentarPublicar;
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
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
  Campos,
  Agotado,
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
          disenadores: string[];
          tipo: AutographType;
        }
      | undefined
    >
  ) => void;
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        disenadores: string[];
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
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  comprarCarrito: () => Promise<void>;
};

export type PublicacionProps = {
  setCaretCoord: (e: SetStateAction<{ x: number; y: number }[]>) => void;
  caretCoord: { x: number; y: number }[];
  publicacion: Quote | Mirror | Comment | Post;
  dict: Dictionary;
  menos?: boolean;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  comentariosAbiertos: boolean[];
  setMostrarInteracciones: (
    e: SetStateAction<{
      tipo: string;
      id?: string;
      abierto: boolean;
    }>
  ) => void;
  setComentariosAbiertos: (e: SetStateAction<boolean[]>) => void;
  indice: number;
  manejarAccionAbierta?: (e: Post, indice: number) => Promise<void>;
  setOpcionAbierta: (
    e: SetStateAction<
      | {
          tipo: string;
          indice: number;
        }
      | undefined
    >
  ) => void;
  abrirMirrorEleccion: boolean[];
  setAbrirMirrorEleccion: (e: SetStateAction<boolean[]>) => void;
  cargandoInteracciones: {
    gusta: boolean;
    espejo: boolean;
    coleccion: boolean;
  };
  setAbrirCita: (
    e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
  ) => void;
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
            item: SimpleCollectOpenActionSettings;
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
  manejarArchivo: (
    e: ChangeEvent<HTMLInputElement>,
    tipo: string,
    indice: number
  ) => void;
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
  ola?: boolean;
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
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
};

export type BarProps = {
  indice: number;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  setMostrarInteracciones: (
    e: SetStateAction<{
      tipo: string;
      id?: string;
      abierto: boolean;
    }>
  ) => void;
  elemento: Post | Mirror | Comment | Quote;
  setAbrirMirrorEleccion: (e: SetStateAction<boolean[]>) => void;
  abrirMirrorEleccion: boolean[];
  cargandoInteracciones: {
    gusta: boolean;
    espejo: boolean;
    coleccion: boolean;
  };
  setComentariosAbiertos: (e: SetStateAction<boolean[]>) => void;
  setAbrirCita: (
    e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
  ) => void;
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
  manejarAccionAbierta?: (e: Post, indice: number) => Promise<void>;
  setSeguirColeccionar: (
    e: SetStateAction<
      | {
          tipo: string;
          collecionar: {
            id: string;
            stats: number;
            item: SimpleCollectOpenActionSettings;
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
  manejarArchivo: (
    e: ChangeEvent<HTMLInputElement>,
    tipo: string,
    indice: number
  ) => void;
  elementoTexto: RefObject<HTMLTextAreaElement>;
  comentarioId?: string;
  cita?: boolean;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  setOpcionAbierta: (
    e: SetStateAction<
      | {
          tipo: string;
          indice: number;
        }
      | undefined
    >
  ) => void;
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
  address: `0x${string}` | undefined;
  publicClient: PublicClient;
  conectado: boolean;
  escenas: Escena[];
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  mostrarPerfil: string | undefined;
  manejarLens: () => Promise<void>;
  openConnectModal: (() => void) | undefined;
  setIndexar: (e: SetStateAction<Indexar>) => void;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  escena: string;
  setAbrirCita: (
    e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
  ) => void;
  aprobar: () => Promise<void>;
  cargandoColeccion: boolean;
  aprobado: boolean;
  mostrarInteracciones: {
    tipo: string;
    id?: string;
    abierto: boolean;
  };
  setMostrarInteracciones: (
    e: SetStateAction<{
      tipo: string;
      id?: string;
      abierto: boolean;
    }>
  ) => void;
  manejarColeccionar: () => Promise<void>;
  seguirColeccionar:
    | {
        tipo: string;
        collecionar: {
          id: string;
          stats: number;
          item: SimpleCollectOpenActionSettings;
        };
        seguidor: Profile;
      }
    | undefined;
  setSeguirColeccionar: (
    e: SetStateAction<
      | {
          tipo: string;
          collecionar: {
            id: string;
            stats: number;
            item: SimpleCollectOpenActionSettings;
          };
          seguidor: Profile;
        }
      | undefined
    >
  ) => void;
  monedasDisponibles: Erc20[];
  setDrops: (
    e: SetStateAction<{
      award: string;
      whoCollectsOpen: boolean;
      creatorAwardOpen: boolean;
      currencyOpen: boolean;
      editionOpen: boolean;
      edition: string;
      timeOpen: boolean;
      time: string;
    }>
  ) => void;
  drops: {
    award: string;
    whoCollectsOpen: boolean;
    creatorAwardOpen: boolean;
    currencyOpen: boolean;
    editionOpen: boolean;
    edition: string;
    timeOpen: boolean;
    time: string;
  };
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
  gifCargando: boolean;
  buscarGifs: {
    search: string;
    gifs: any[];
  };
  setBuscarGifs: (
    e: SetStateAction<{
      search: string;
      gifs: any[];
    }>
  ) => void;
  manejarGif: (e: string) => Promise<void>;
  setOpcionAbierta: (
    e: SetStateAction<
      | {
          tipo: string;
          indice: number;
        }
      | undefined
    >
  ) => void;
  opcionAbierta:
    | {
        tipo: string;
        indice: number;
      }
    | undefined;
  errorInteraccion: boolean;
  indexar: Indexar;
  hacerPublicacion: () => Promise<void>;
  conectarPub: boolean;
  comentarPublicar: ComentarPublicar[];
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
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
  hacerCita: () => Promise<void>;
  citaCargando: boolean;
  citaPublicar: ComentarPublicar[];
  setCitaPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  setCitaAbierta: (
    e: SetStateAction<Post | Comment | Quote | Mirror | undefined>
  ) => void;
  citaAbierta: Post | Comment | Quote | Mirror | undefined;
  setCaretCoordCita: (e: SetStateAction<{ x: number; y: number }[]>) => void;
  mencionarPerfilesCita: Profile[];
  manejarArchivoCita: (
    e: ChangeEvent<HTMLInputElement>,
    tipo: string,
    indice: number
  ) => void;
  setMencionarPerfilesCita: (e: SetStateAction<Profile[]>) => void;
  setPerfilesAbiertosCita: (e: SetStateAction<boolean[]>) => void;
  perfilesAbiertosCita: boolean[];
  caretCoordCita: { x: number; y: number }[];
  elementoTextoCita: RefObject<HTMLTextAreaElement>;
};

export type CitaPubProps = {
  hacerCita: () => Promise<void>;
  citaCargando: boolean;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  citaPublicar: ComentarPublicar;
  setCitaPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  setCitaAbierta: (
    e: SetStateAction<Post | Comment | Quote | Mirror | undefined>
  ) => void;
  setOpcionAbierta: (
    e: SetStateAction<
      | {
          tipo: string;
          indice: number;
        }
      | undefined
    >
  ) => void;
  citaAbierta: Post | Comment | Quote | Mirror | undefined;
  dict: Dictionary;
  lensConectado: Profile | undefined;
  setPerfilesAbiertos: (e: SetStateAction<boolean[]>) => void;
  setMencionarPerfiles: (e: SetStateAction<Profile[]>) => void;
  perfilesAbiertos: boolean[];
  caretCoord: {
    x: number;
    y: number;
  }[];
  manejarArchivo: (
    e: ChangeEvent<HTMLInputElement>,
    tipo: string,
    indice: number
  ) => void;
  mencionarPerfiles: Profile[];
  elementoTexto: RefObject<HTMLTextAreaElement>;
  setCaretCoord: (
    e: SetStateAction<
      {
        x: number;
        y: number;
      }[]
    >
  ) => void;
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

export type QuienProps = {
  tipo: string;
  reactors: any[];
  quoters: any[];
  tieneMas: boolean;
  address: `0x${string}`;
  publicClient: PublicClient;
  conectado: boolean;
  openConnectModal: (() => void) | undefined;
  manejarLens: () => Promise<void>;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
  setIndexar: (e: SetStateAction<Indexar>) => void;
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  escena: string;
  comentarPublicar: ComentarPublicar[];
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  setOpcionAbierta: (
    e: SetStateAction<
      | {
          tipo: string;
          indice: number;
        }
      | undefined
    >
  ) => void;
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
  setAbrirCita: (
    e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
  ) => void;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  setReactors: (e: SetStateAction<any[]>) => void;
  setQuoters: (e: SetStateAction<(Comment | Quote)[]>) => void;
  setSeguirColeccionar: (
    e: SetStateAction<
      | {
          tipo: string;
          collecionar: {
            id: string;
            stats: number;
            item: SimpleCollectOpenActionSettings;
          };
          seguidor: Profile;
        }
      | undefined
    >
  ) => void;
  tieneMasCita: boolean;
  muestraMas: () => void;
  mirrorQuote: boolean;
  dict: Dictionary;
  lensConectado: Profile | undefined;
  setMostrarInteracciones: (
    e: SetStateAction<{
      tipo: string;
      id?: string;
      abierto: boolean;
    }>
  ) => void;
};

export type PerfilProps = {
  dict: Dictionary;
  publicClient: PublicClient;
  lensConectado: Profile | undefined;
  escenas: Escena[];
  mostrarPerfil: string | undefined;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  setIndexar: (e: SetStateAction<Indexar>) => void;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
};

export type InteraccionesProps = {
  lensConectado: Profile | undefined;
  publicClient: PublicClient;
  conectado: boolean;
  openConnectModal: (() => void) | undefined;
  setIndexar: (e: SetStateAction<Indexar>) => void;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  escena: string;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  comentarPublicar: ComentarPublicar[];
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  setOpcionAbierta: (
    e: SetStateAction<
      | {
          tipo: string;
          indice: number;
        }
      | undefined
    >
  ) => void;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
  setAbrirCita: (
    e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
  ) => void;
  manejarLens: () => Promise<void>;
  address: `0x${string}`;
  setSeguirColeccionar: (
    e: SetStateAction<
      | {
          tipo: string;
          collecionar: {
            id: string;
            stats: number;
            item: SimpleCollectOpenActionSettings;
          };
          seguidor: Profile;
        }
      | undefined
    >
  ) => void;
  mostrarInteracciones: {
    tipo: string;
    id?: string;
    abierto: boolean;
  };
  dict: Dictionary;
  setMostrarInteracciones: (
    e: SetStateAction<{
      tipo: string;
      id?: string;
      abierto: boolean;
    }>
  ) => void;
};

export type SeguirProps = {
  dict: Dictionary;
  aprobar: () => Promise<void>;
  cargandoColeccion: boolean;
  aprobado: boolean;
  manejarColeccionar: () => Promise<void>;
  seguirColeccionar:
    | {
        tipo: string;
        collecionar: {
          id: string;
          stats: number;
          item: SimpleCollectOpenActionSettings;
        };
        seguidor: Profile;
      }
    | undefined;
  setSeguirColeccionar: (
    e: SetStateAction<
      | {
          tipo: string;
          collecionar: {
            id: string;
            stats: number;
            item: SimpleCollectOpenActionSettings;
          };
          seguidor: Profile;
        }
      | undefined
    >
  ) => void;
};
