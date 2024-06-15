import { ChangeEvent, MutableRefObject, SetStateAction } from "react";
import Draggable from "react-draggable";
import { Notificacion } from "./../../common/types/common.types";
import { Profile, SimpleCollectOpenActionModuleInput } from "../../../../graphql/generated";

export type LogProps = {
  connected: boolean;
  lensConectado: Profile | undefined;
  openConnectModal: (() => void) | undefined;
  manejarSalir: () => void;
  manejarLens: () => Promise<void>;
  lensCargando: boolean;
  setDragDialog: (e: SetStateAction<boolean>) => void;
  contenedorMensajesRef: MutableRefObject<HTMLDivElement | null>;
  cargando: boolean;
  dict: Dictionary;
  setPantalla: (e: SetStateAction<number>) => void;
  setPerfilesAbiertos: (e: SetStateAction<boolean[]>) => void;
  setMencionarPerfiles: (e: SetStateAction<Profile[]>) => void;
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  perfilesAbiertos: boolean;
  caretCoord: {
    x: number;
    y: number;
  };
  setCaretCoord: (
    e: SetStateAction<{
      x: number;
      y: number;
    }>
  ) => void;
  comentarPublicar: ComentarPublicar;
  mencionarPerfiles: Profile[];
  publicacionCargando: boolean;
  manejarPublicar: () => Promise<void>
};

export type MintProps = {
  setMint: (e: SetStateAction<number>) => void;
  mint: number;
  dict: Dictionary;
  manejarMintear: () => Promise<void>;
  mintCargando: boolean;
};

export type ProcessProps = {
  setMint: (e: SetStateAction<number>) => void;
  mint: number;
  dict: Dictionary;
  borrarColeccion: () => Promise<void>;
  borrarGaleria: (galeriaId: number) => Promise<void>;
  isConnected: boolean;
  manejarMintear: () => Promise<void>;
  manejarAhorar: () => Promise<void>;
  mintCargando: boolean;
  esArtista: boolean;
  cargandoBorrar: boolean;
  setColecciones: (e: SetStateAction<Coleccion[]>) => void;
  openConnectModal: (() => void) | undefined;
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  colecciones: Coleccion[];
  setColeccionActual: (e: SetStateAction<Coleccion>) => void;
  coleccionActual: Coleccion;
  manejarArchivo: (e: ChangeEvent<HTMLInputElement>) => void;
  dropDown: {
    npcsAbiertos: boolean;
    idiomasAbiertos: boolean;
    tiposAbiertos: boolean;
    npcsTexto: string;
    idiomasTexto: string;
  };
  mostrarGalerias: boolean;
  setMostrarGalerias: (e: SetStateAction<boolean>) => void;
  todasLasGalerias: Galeria[];
  cargandoGalerias: boolean;
  setDropDown: (
    e: SetStateAction<{
      npcsAbiertos: boolean;
      idiomasAbiertos: boolean;
      tiposAbiertos: boolean;
      npcsTexto: string;
      idiomasTexto: string;
    }>
  ) => void;
};

export type SceneProps = {
  escena: string;
  dict: Dictionary;
  setEscena: (e: SetStateAction<string>) => void;
  npc: string;
  setNpc: (e: SetStateAction<string>) => void;
};

export interface Message {
  team: string;
  name: string;
  message: string;
  color: string;
  base: string;
}

export interface Waypoint {
  destino: { x: number; y: number };
  direccion: string;
  duracion?: number;
}

export type DialogProps = {
  setIndiceConversacionActual: (e: SetStateAction<number>) => void;
  indiceConversacionActual: number;
  contenedorMensajesRef: MutableRefObject<HTMLDivElement | null>;
  wrapperRef: MutableRefObject<Draggable | null>;
  setDragDialog: (e: SetStateAction<boolean>) => void;
  setPerfilesAbiertos: (e: SetStateAction<boolean[]>) => void;
  setMencionarPerfiles: (e: SetStateAction<Profile[]>) => void;
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  perfilesAbiertos: boolean;
  caretCoord: {
    x: number;
    y: number;
  };
  setCaretCoord: (
    e: SetStateAction<{
      x: number;
      y: number;
    }>
  ) => void;
  comentarPublicar: ComentarPublicar;
  mencionarPerfiles: Profile[];
  lensConectado: Profile | undefined;
  dict: Dictionary;
  manejarPublicar: () => Promise<void>
  publicacionCargando: boolean;
};

export type ChatProps = {
  contenedorMensajesRef: MutableRefObject<HTMLDivElement | null>;
  open?: boolean;
  lensConectado: Profile | undefined;
  indice: number;
  setPerfilesAbiertos: (e: SetStateAction<boolean[]>) => void;
  setMencionarPerfiles: (e: SetStateAction<Profile[]>) => void;
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  perfilesAbiertos: boolean;
  caretCoord: {
    x: number;
    y: number;
  };
  manejarPublicar: () => Promise<void>
  setCaretCoord: (
    e: SetStateAction<{
      x: number;
      y: number;
    }>
  ) => void;
  comentarPublicar: ComentarPublicar;
  mencionarPerfiles: Profile[];
  dict: Dictionary;
  publicacionCargando: boolean;
};

export interface ComentarPublicar {
  contenido: string | undefined;
  imagenes: {
    media: string;
    tipo: string;
  }[];
  videos: string[];
  gifs: string[]
  coleccionar?: SimpleCollectOpenActionModuleInput | undefined;
}

export enum Direccion {
  Izquierda = "izquierda",
  Derecha = "derecha",
  Arriba = "arriba",
  Abajo = "abajo",
  IzquierdaArriba = "izquierdaArriba",
  IzquierdaAbajo = "izquierdaAbajo",
  DerechaArriba = "derechaArriba",
  DerechaAbajo = "derechaAbajo",
  Inactivo = "inactivo",
  Sofa = "sentadoSofa",
  Silla = "sentadoEscritorio",
}

export interface PhaserGameElement extends HTMLElement {
  game: Phaser.Game;
}

export interface Escena {
  clave: string;
  mundo: {
    anchura: number;
    altura: number;
  };
  imagen: string;
  prohibido: {
    x: number;
    y: number;
    anchura: number;
    altura: number;
  }[];
  profundidad: Articulo[];
  sillas: Seat[];
  interactivos: Articulo[];
  fondo: {
    etiqueta: string;
    uri: string;
    anchura: number;
    altura: number;
    sitio: {
      x: number;
      y: number;
    };
  };
  objetos: Articulo[];
  sprites: Sprite[];
}

export interface Articulo {
  image: Phaser.GameObjects.Image;
  uri: string;
  etiqueta: string;
  sitio: {
    x: number;
    y: number;
  };
  escala: {
    x: number;
    y: number;
  };
  talla: {
    x: number;
    y: number;
  };
  profundidad?: number;
}

export interface Objeto {
  x: number;
  y: number;
  displayHeight: number;
  displayWidth: number;
}

export interface Seat {
  image: Phaser.GameObjects.Image;
  x_adjustado: number;
  y_adjustado: number;
  profundidad: boolean;
  depth?: number;
  par?: Phaser.GameObjects.Image;
  anim: Direccion;
  etiqueta: string;
  sitio: {
    x: number;
    y: number;
  };
  talla: {
    x: number;
    y: number;
  };
  uri: string;
  escala: {
    x: number;
    y: number;
  };
}

export interface Sprite {
  etiqueta: string;
  uri: string;
  x: number;
  y: number;
  tapa: string;
  altura: number;
  anchura: number;
  anchura_borde: number;
  altura_borde: number;
  margen: number;
  marco_inicio: number;
  marco_final: number;
  escala: {
    x: number;
    y: number;
  };
}

export interface Estado {
  estado: Movimiento;
  puntos_de_camino: { x: number; y: number }[];
  duracion?: number;
  npc_etiqueta: string;
  silla_aleatoria?: string;
}

export enum Movimiento {
  Move = "Move",
  Sit = "Sit",
  Idle = "Idle",
}

export type Dictionary = {
  Home: {
    title: string;
    create: string;
    gTitulo: string;
    error: string;
    añadido: string;
    coleccionEliminada: string;
    creado: string;
    galeriaEliminada: string;
    save: string;
    all: string;
    back: string;
    orders: string;
    connect: string;
    message: string;
    studio: string;
    chat: string;
    sent: string;
    select: string;
    send: string;
    player: string;
    scene: string;
    auth: string;
    mint: string;
    cat: string;
    again: string;
    exit: string;
    comp: string;
    notif: string;
    des: string;
    tit: string;
    gCol: string;
    new: string;
    amount: string;
    price: string;
    tokens: string;
    tags: string;
    npcL: string;
    add: string;
    delete: string;
    gMint: string;
    gCreate: string;
    tipo: string;
  };
  Nav: {
    lan: string;
  };
  "404": {
    nada: string;
  };
};

export type PantallaCambioProps = {
  npc: string;
  escena: string;
  colecciones: Coleccion[];
  setManejarMostrarArticulo: (e: SetStateAction<string | undefined>) => void;
  manejarMostrarArticulo: string | undefined;
  setColecciones: (e: SetStateAction<Coleccion[]>) => void;
  setColeccionActual: (e: SetStateAction<Coleccion>) => void;
  coleccionActual: Coleccion;
  mostrarGalerias: boolean;
  setMostrarGalerias: (e: SetStateAction<boolean>) => void;
  manejarAhorar: () => Promise<void>;
  manejarArchivo: (e: ChangeEvent<HTMLInputElement>) => void;
  setNpc: (e: SetStateAction<string>) => void;
  setCargando: (e: SetStateAction<boolean>) => void;
  cargando: boolean;
  pantalla: number;
  cargandoBorrar: boolean;
  setMint: (e: SetStateAction<number>) => void;
  mint: number;
  dict: Dictionary;
  manejarMintear: () => Promise<void>;
  mintCargando: boolean;
  isConnected: boolean;
  esArtista: boolean;
  openConnectModal: (() => void) | undefined;
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  todasLasGalerias: Galeria[];
  cargandoGalerias: boolean;
  dropDown: {
    npcsAbiertos: boolean;
    idiomasAbiertos: boolean;
    tiposAbiertos: boolean;
    npcsTexto: string;
    idiomasTexto: string;
  };
  borrarColeccion: () => Promise<void>;
  borrarGaleria: (galeriaId: number) => Promise<void>;
  setDropDown: (
    e: SetStateAction<{
      npcsAbiertos: boolean;
      tiposAbiertos: boolean;
      idiomasAbiertos: boolean;
      npcsTexto: string;
      idiomasTexto: string;
    }>
  ) => void;
};

export interface Galeria {
  galleryId: string;
  collectionIds: string[];
  colecciones: Coleccion[];
}

export interface Coleccion {
  galeria: string;
  imagen: string;
  id: number;
  cantidad: number;
  tokenes: `0x${string}`[];
  precio: number;
  tipo: AutographType;
  titulo: string;
  descripcion: string;
  etiquetas: string;
  npcIdiomas: string;
  npcInstrucciones: string;
  npcs: string;
  tokenesMinteados: [];
  galeriaId?: number;
  coleccionId?: number;
}

export enum AutographType {
  NFT,
  Hoodie,
  Shirt,
}

export interface OracleData {
  currency: string;
  rate: string;
  wei: string;
}
