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

export interface Seat {
  obj: Phaser.GameObjects.Image;
  anim: string;
  depth: boolean;
  adjustedX: number;
  adjustedY: number;
  texture: string;
  depthCount: number | undefined;
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
  fondo: {
    etiqueta: string;
    uri: string;
    displayWidth: number;
    displayHeight: number;
    origen: {
      x: number;
      y: number;
    };
    sitio: {
      x: number;
      y: number;
    };
  };
  evitar: {
    x: number;
    y: number;
    displayHeight: number;
    displayWidth: number;
  }[];
  profundidad: {
    x: number;
    y: number;
    displayHeight: number;
    displayWidth: number;
  }[];
  objects: {
    uri: string;
    etiqueta: string;
    sitio: {
      x: number;
      y: number;
    };
    origen: {
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
    depth: number;
    seatInfo?: {
      adjustedX: number;
      adjustedY: number;
      depthCount: number;
      anim: Direccion;
      depth: boolean;
    };
    profound?: boolean;
  }[];
  sprites: Sprite[];
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
  origen: {
    x: number;
    y: number;
  };
  escala: {
    x: number;
    y: number;
  };
}
