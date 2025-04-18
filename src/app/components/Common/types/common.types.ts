import {
  Account,
  BigDecimal,
  DateTime,
  EvmAddress,
  SessionClient,
} from "@lens-protocol/client";
import Phaser from "phaser";
import { RefObject, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Draggable from "react-draggable";
import { Details } from "../../Orders/types/orders.types";

export interface LensConnected {
  profile?: Account;
  sessionClient?: SessionClient;
  address?: `0x${string}`;
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
  interactivos: Interactivo[];
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

export enum AutographType {
  NFT = "NFT",
  Hoodie = "Hoodie",
  Shirt = "Shirt",
  Catalog = "Catalog",
  All = "All",
}

export interface Interactivo {
  image: Phaser.GameObjects.Image;
  uri: string;
  etiqueta: string;
  disenadores: string[];
  tipo: AutographType;
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
  account?: Account;
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
  billetera: string;
  prompt: {
    bio: string;
    lore: string;
    style: string;
    knowledge: string;
    adjectives: string;
    model: string;
    custom_instructions: string;
    message_examples: MessageExample[][];
    cover: string;
  };
  amigos: Sprite[];
  account_address: string;
  escala: {
    x: number;
    y: number;
  };
}

interface MessageExample {
  user: string;
  content: {
    text: string;
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

export interface Compra {
  elemento: Catalogo | Coleccion;
  cantidad: number;
  tipo: AutographType;
  color: string;
  tamano: string;
  token: string;
}

export interface Coleccion {
  imagenes: string[];
  id?: number;
  cantidad: number;
  tokenes: `0x${string}`[];
  precio: number;
  colors: string[];
  tipo: AutographType;
  profile: Account | undefined;
  titulo: string;
  descripcion: string;
  etiquetas: string;
  npcInstrucciones: string;
  npcs: string;
  tokenesMinteados: number[];
  galeriaId?: number;
  coleccionId?: number;
  postIds: string[];
}

export interface DatosOraculos {
  currency: string;
  rate: string;
  wei: string;
}

export enum Indexar {
  Inactivo = "inactivo",
  Exito = "success",
  Indexando = "indexing",
}

export interface Catalogo {
  paginas: string[];
  tokenes: string[];
  uri: string;
  disenador: string;
  precio: number;
  postId: number;
  cantidad: number;
  minteado: number;
  paginasContadas: number;
  profile: Account | undefined;
  tipo: AutographType;
}

export type SceneProps = {
  dict: any;
  npc: string | undefined;
  setNpc: (e: SetStateAction<string | undefined>) => void;
};

export type StudioProps = {
  cargando: boolean;
  npc: string | undefined;
  dict: any;
  setNpc: (e: SetStateAction<string | undefined>) => void;
  setCargando: (e: SetStateAction<boolean>) => void;
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        tipo: AutographType;
        disenadores: string[];
      }
    | undefined;
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          tipo: AutographType;
          disenadores: string[];
        }
      | undefined
    >
  ) => void;
};

export type PantallaCambioProps = {
  dict: any;
  cargando: boolean;
  npc: string | undefined;
  setNpc: (e: SetStateAction<string | undefined>) => void;
  setCargando: (e: SetStateAction<boolean>) => void;
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        tipo: AutographType;
        disenadores: string[];
      }
    | undefined;
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          tipo: AutographType;
          disenadores: string[];
        }
      | undefined
    >
  ) => void;
};

export type LogProps = {
  cargando: boolean;
  dict: any;
  router: AppRouterInstance;
  setDragDialog: (e: SetStateAction<boolean>) => void;
};

export type DialogProps = {
  setDragDialog: (e: SetStateAction<boolean>) => void;
  wrapperRef: RefObject<Draggable | null>;
  dict: any;
  router: AppRouterInstance;
};

export interface SimpleCollect {
  isImmutable?: boolean | null | undefined;
  endsAt?: DateTime | null | undefined;
  followerOnGraph?:
    | {
        globalGraph: true;
      }
    | {
        graph: EvmAddress;
      }
    | null
    | undefined;
  collectLimit?: number | null | undefined;
  payToCollect?:
    | {
        referralShare?: number | null | undefined;
        recipients: {
          percent: number;
          address: EvmAddress;
        }[];
        amount: {
          value: BigDecimal;
          currency: EvmAddress;
        };
      }
    | null
    | undefined;
}

export interface ComentarPublicar {
  contenido: string | undefined;
  imagenes: {
    medios: string;
    tipo: string;
  }[];
  videos: string[];
  gifs: string[];
  coleccionar?: SimpleCollect | undefined;
}

export type PantallaComprarProps = {
  dict: any;
  articuloCargando: boolean;
  articulosActuales: Coleccion[] | Catalogo[] | undefined;
  articuloSeleccionado: Compra[];
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  articuloIndice: number;
  setArticuloIndice: (e: SetStateAction<number>) => void;
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        tipo: AutographType;
        disenadores: string[];
      }
    | undefined;
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          tipo: AutographType;
          disenadores: string[];
        }
      | undefined
    >
  ) => void;
};

export type ComprasCambioProps = {
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        tipo: AutographType;
        disenadores: string[];
      }
    | undefined;
  dict: any;
  carritoCargando: boolean;
  aprobarCargando: boolean;
  setAprobarCargando: (e: SetStateAction<boolean>) => void;
  setCarritoCargando: (e: SetStateAction<boolean>) => void;
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          tipo: AutographType;
          disenadores: string[];
        }
      | undefined
    >
  ) => void;
  articulosActuales: Coleccion[] | Catalogo[] | undefined;
  articuloSeleccionado: Compra[];
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  articuloIndice: number;
  setArticuloIndice: (e: SetStateAction<number>) => void;
};

export type CarritoAbiertoProps = {
  dict: any;
  setCarritoCargando: (e: SetStateAction<boolean>) => void;
  setAprobarCargando: (e: SetStateAction<boolean>) => void;
  carritoCargando: boolean;
  aprobarCargando: boolean;
};

export type CumplimientoProps = {
  dict: any;
  cumplimiento: Details;
  setCumplimiento: (e: SetStateAction<Details>) => void;
  color?: string;
  setColor?: (e: string) => void;
  tamano?: string;
  setTamano?: (e: string) => void;
  abierto?: boolean;
};

export type BotonesProps = {
  indice: number;
  comprarPublicacion?: (elemento: Compra) => Promise<void>;
  carritoCargando: boolean;
  articulo: Compra;
  dict: any;
  agotado?: boolean;
  minteado: number;
  cantidad: number;
  precio: number;
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  depositFunds: () => Promise<void>;
  depositLoading: boolean;
  deposited: boolean;
};

export type CatalogoProps = {
  dict: any;
  catalogo: Catalogo;
  articuloSeleccionado: Compra[];
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          tipo: AutographType;
          disenadores: string[];
        }
      | undefined
    >
  ) => void;
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
};

export type AutografoProps = {
  dict: any;
  articulos: Coleccion[];
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  articuloIndice: number;
  setArticuloIndice: (e: SetStateAction<number>) => void;
  articuloSeleccionado: Compra[];
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          tipo: AutographType;
          disenadores: string[];
        }
      | undefined
    >
  ) => void;
};

export type RopasProps = {
  dict: any;
  articulos: Coleccion[];
  setManejarMostrarArticulo: (
    e: SetStateAction<
      | {
          etiqueta: string;
          tipo: AutographType;
          disenadores: string[];
        }
      | undefined
    >
  ) => void;
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  articuloSeleccionado: Compra[];
  articuloIndice: number;
  setArticuloIndice: (e: SetStateAction<number>) => void;
};
