import { MutableRefObject, SetStateAction } from "react";
import Draggable from "react-draggable";

export type LogProps = {
  connected: boolean;
  openConnectModal: (() => void) | undefined;

  setDragDialog: (e: SetStateAction<boolean>) => void;
  indiceMensajeActual: number;
  handleCompletarTyping: () => void;
  indiceConversacionActual: number;
  contenedorMensajesRef: MutableRefObject<HTMLDivElement | null>;
  cargando: boolean;
  setArtists: (e: SetStateAction<number>) => void;
  dict: Dictionary;
};

export type MintProps = {
  setArtists: (e: SetStateAction<number>) => void;
  artists: number;
  dict: Dictionary;
  manejarMintear: () => Promise<void>;
  mintCargando: boolean;
};

export type ProcessProps = {
  setArtists: (e: SetStateAction<number>) => void;
  artists: number;
  dict: Dictionary;
  manejarMintear: () => Promise<void>;
  mintCargando: boolean;
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
  indiceMensajeActual: number;
  handleCompletarTyping: () => void;
  setIndiceConversacionActual: (e: SetStateAction<number>) => void;
  setIndiceMensajeActual: (e: SetStateAction<number>) => void;
  indiceConversacionActual: number;
  contenedorMensajesRef: MutableRefObject<HTMLDivElement | null>;
  wrapperRef: MutableRefObject<Draggable | null>;
  setDragDialog: (e: SetStateAction<boolean>) => void;
};

export type ChatProps = {
  indiceMensajeActual: number;
  handleCompletarTyping: () => void;
  indiceConversacionActual: number;
  contenedorMensajesRef: MutableRefObject<HTMLDivElement | null>;
  open?: boolean;
};

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
    notify: string;
    chat: string;
    select: string;
    player: string;
    scene: string;
    auth: string;
    mint: string;
    cat: string;
    again: string;
    exit: string;
    comp: string;
  };
  Nav: {
    lan: string;
  };
  "404": {
    nada: string;
  };
};