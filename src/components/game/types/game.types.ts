import { MutableRefObject, SetStateAction } from "react";
import Draggable from "react-draggable";

export type LogProps = {
  connected: boolean;
  openConnectModal: (() => void) | undefined;
  t: any;
  setDragDialog: (e: SetStateAction<boolean>) => void;
  indiceMensajeActual: number;
  handleCompletarTyping: () => void;
  indiceConversacionActual: number;
  contenedorMensajesRef: MutableRefObject<HTMLDivElement | null>;
};

export type SceneProps = {
  escena: string;
  t: any;
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
  DerechaArribaDerecha = "derechaArriba",
  ArribaArribaDerecha = "derechaArriba",
  ArribaArribaIzquierda = "izquierdaArriba",
  IzquierdaArribaIzquierda = "izquierdaArriba",
  IzquierdaAbajoIzquierda = "izquierdaAbajo",
  AbajoAbajoIzquierda = "izquierdaAbajo",
  AbajoAbajoDerecha = "derechaAbajo",
  DerechaAbajoDerecha = "derechaAbajo",
  Inactivo = "inactivo",
  Sofa = "sentadoSofa",
  Silla = "sentadoEscritorio",
}

export interface PhaserGameElement extends HTMLElement {
  game: Phaser.Game;
}

export interface Escena {
  key: string;
  world: {
    width: number;
    height: number;
  };
  evitar: {
    x: number;
    y: number;
    displayHeight: number;
    displayWidth: number;
  }[];
  profundidad: Articulo[];
  sillas: Seat[];
  fondo: {
    etiqueta: string;
    uri: string;
    displayWidth: number;
    displayHeight: number;
    sitio: {
      x: number;
      y: number;
    };
  };
  objects: Articulo[];
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
  adjustedX: number;
  adjustedY: number;
  profundidad: boolean;
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
  displayHeight: number;
  displayWidth: number;
  frameWidth: number;
  frameHeight: number;
  margin: number;
  startFrame: number;
  endFrame: number;
  escala: {
    x: number;
    y: number;
  };
}
