import { ChangeEvent, MutableRefObject, SetStateAction } from "react";
import Draggable from "react-draggable";
import { Indexar, Notificacion } from "./../../common/types/common.types";
import {
  Comment,
  Mirror,
  Post,
  Profile,
  Quote,
  SimpleCollectOpenActionModuleInput,
  SimpleCollectOpenActionSettings,
} from "../../../../graphql/generated";
import { PublicClient } from "viem";
import { Compra, Details } from "@/components/compras/types/compras.types";
import { AccessControlConditions } from "@lit-protocol/types";
import { DecodedMessage } from "@xmtp/xmtp-js";

export type LogProps = {
  connected: boolean;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  lensConectado: Profile | undefined;
  openConnectModal: (() => void) | undefined;
  manejarSalir: () => void;
  setMostrarInteracciones: (
    e: SetStateAction<{
      tipo: string;
      id?: string;
      abierto: boolean;
    }>
  ) => void;
  manejarLens: () => Promise<void>;
  lensCargando: boolean;
  setDragDialog: (e: SetStateAction<boolean>) => void;
  cargando: boolean;
  setAbrirCita: (
    e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
  ) => void;
  dict: Dictionary;
  setPantalla: (e: SetStateAction<number>) => void;
  address: `0x${string}` | undefined;
  publicClient: PublicClient;
  setIndexar: (e: SetStateAction<Indexar>) => void;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
  escena: string;
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
  comentarPublicar: ComentarPublicar[];
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  npcIds: string[];
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
  borrarGaleria: (galeriaId: number, indice: number) => Promise<void>;
  isConnected: boolean;
  manejarMintear: () => Promise<void>;
  manejarAhorrar: () => Promise<void>;
  ahorrarCargando: boolean;
  mintCargando: boolean;
  esArtista: boolean;
  cargandoBorrar: boolean[];
  indiceImagen: number;
  setIndiceImagen: (e: SetStateAction<number>) => void;
  setColecciones: (e: SetStateAction<Coleccion[]>) => void;
  openConnectModal: (() => void) | undefined;
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  colecciones: Coleccion[];
  escenas: Escena[];
  setColeccionActual: (e: SetStateAction<Coleccion>) => void;
  coleccionActual: Coleccion;
  manejarArchivo: (e: ChangeEvent<HTMLInputElement>, indice?: number) => void;
  setConectarPub: (e: SetStateAction<boolean>) => void;
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
  escenas: Escena[];
  lensConectado: Profile | undefined;
  setEscena: (e: SetStateAction<string>) => void;
  npc: string | undefined;
  setNpc: (e: SetStateAction<string | undefined>) => void;
  publicClient: PublicClient;
  setIndexar: (e: SetStateAction<Indexar>) => void;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
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
  wrapperRef: MutableRefObject<Draggable | null>;
  setDragDialog: (e: SetStateAction<boolean>) => void;
  lensConectado: Profile | undefined;
  dict: Dictionary;
  conectado: boolean;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  openConnectModal: (() => void) | undefined;
  manejarLens: () => Promise<void>;
  comentarPublicar: ComentarPublicar[];
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  setMostrarInteracciones: (
    e: SetStateAction<{
      tipo: string;
      id?: string;
      abierto: boolean;
    }>
  ) => void;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  npcIds: string[];
  setAbrirCita: (
    e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
  ) => void;

  address: `0x${string}` | undefined;
  publicClient: PublicClient;
  setIndexar: (e: SetStateAction<Indexar>) => void;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
  escena: string;
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

export type ChatProps = {
  open?: boolean;
  conectado: boolean;
  openConnectModal: (() => void) | undefined;
  manejarLens: () => Promise<void>;
  setMostrarPerfil: (e: SetStateAction<string | undefined>) => void;
  dict: Dictionary;
  address: `0x${string}` | undefined;
  publicClient: PublicClient;
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
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
  comentarPublicar: ComentarPublicar[];
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void;
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
  setIndexar: (e: SetStateAction<Indexar>) => void;
  setErrorInteraccion: (e: SetStateAction<boolean>) => void;
  escena: string;
  lensConectado: Profile | undefined;
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  npcIds: string[];
  setMostrarInteracciones: (
    e: SetStateAction<{
      tipo: string;
      id?: string;
      abierto: boolean;
    }>
  ) => void;
  setAbrirCita: (
    e: SetStateAction<Quote | Post | Comment | Mirror | undefined>
  ) => void;
};

export interface ComentarPublicar {
  contenido: string | undefined;
  imagenes: {
    medios: string;
    tipo: string;
  }[];
  videos: string[];
  gifs: string[];
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
  billetera: string;
  prompt: {
    personalidad: string;
    idiomas: string[];
  };
  perfil_id: number;
  tapa_dos: string;
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
    frase1: string;
    indice: string;
    frase2: string;
    ropa: string;
    frase3: string;
    mir: string;
    quo: string;
    returns: string;
    faq: string;
    frase4: string;
    yes: string;
    hr: string;
    siguiendo: string;
    seguidores: string;
    info: string;
    dejar: string;
    seguir: string;
    red: string;
    pedidos: string;
    over: string;
    fin: string;
    col: string;
    who: string;
    time: string;
    ago: string;
    limit: string;
    edition: string;
    awardAmount: string;
    NoMensaje: string;
    award: string;
    todos: string;
    seguidor: string;
    ref: string;
    moneda: string;
    buscarGif: string;
    imagen: string;
    buscar: string;
    video: string;
    collect: string;
    idi: string;
    onChain: string;
    nada: string;
    tx: string;
    campos: string;
    comprado: string;
    regresar: string;
    noMix: string;
    mensajes: string;
    aprobar: string;
    cumplimiento: string;
    descifrado: string;
    lens: string;
    lens2: string;
    pedido: string;
    gNew: string;
    descifrar: string;
    cump: string;
    carritoCompra: string;
    precioMax: string;
    carrito: string;
    random: string;
    create: string;
    gUpdate: string;
    agotado: string;
    cart: string;
    pub: string;
    gTitulo: string;
    error: string;
    mirror: string;
    comment: string;
    addCart: string;
    pubCompra: string;
    quote: string;
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
    nombre: string;
    npcStudio: string;
    ciudad: string;
    direccion: string;
    estado: string;
    pais: string;
    todoElCatalogo: string;
    muestra: string;
  };
  Nav: {
    lan: string;
  };
  "404": {
    nada: string;
  };
};

export type PantallaCambioProps = {
  npc: string | undefined;
  escena: string;
  colecciones: Coleccion[];
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
  setColecciones: (e: SetStateAction<Coleccion[]>) => void;
  setColeccionActual: (e: SetStateAction<Coleccion>) => void;
  coleccionActual: Coleccion;
  mostrarGalerias: boolean;
  setMostrarGalerias: (e: SetStateAction<boolean>) => void;
  manejarAhorrar: () => Promise<void>;
  ahorrarCargando: boolean;
  manejarArchivo: (e: ChangeEvent<HTMLInputElement>, indice?: number) => void;
  setNpc: (e: SetStateAction<string | undefined>) => void;
  setCargando: (e: SetStateAction<boolean>) => void;
  cargando: boolean;
  cargandoBorrar: boolean[];
  dict: Dictionary;
  manejarMintear: () => Promise<void>;
  mintCargando: boolean;
  isConnected: boolean;
  openConnectModal: (() => void) | undefined;
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
  borrarGaleria: (galeriaId: number, indice: number) => Promise<void>;
  setDropDown: (
    e: SetStateAction<{
      npcsAbiertos: boolean;
      tiposAbiertos: boolean;
      idiomasAbiertos: boolean;
      npcsTexto: string;
      idiomasTexto: string;
    }>
  ) => void;
  publicClient: PublicClient;
  address: `0x${string}` | undefined;
  setConectarPub: (e: SetStateAction<boolean>) => void;
  todosLosPedidos: Pedido[];
  pedidosCargando: boolean;
  manejarDescifrar: (indice: number) => Promise<void>;
  descifrarCargando: boolean[];
  pedidoAbierto: boolean[];
  indiceImagen: number;
  setIndiceImagen: (e: SetStateAction<number>) => void;
  setPedidoAbierto: (e: SetStateAction<boolean[]>) => void;
};

export interface Galeria {
  galleryId: string;
  collectionIds: string[];
  colecciones: Coleccion[];
}

export interface Coleccion {
  galeria: string;
  imagen: string;
  imagenes: string[];
  id: number;
  cantidad: number;
  tokenes: `0x${string}`[];
  precio: number;
  colors: string[];
  tipo: AutographType;
  profile: Profile | undefined;
  titulo: string;
  descripcion: string;
  etiquetas: string;
  npcIdiomas: string;
  npcInstrucciones: string;
  npcs: string;
  tokenesMinteados: number[];
  galeriaId?: number;
  coleccionId?: number;
  profileIds: string[];
  pubIds: string[];
}

export enum AutographType {
  NFT = "NFT",
  Hoodie = "Hoodie",
  Shirt = "Shirt",
  Catalog = "Catalog",
  Mix = "Mix",
  All = "All",
}

export interface DatosOraculos {
  currency: string;
  rate: string;
  wei: string;
}

export type PedidosProps = {
  todosLosPedidos: Pedido[];
  pedidosCargando: boolean;
  manejarDescifrar: (indice: number) => Promise<void>;
  descifrarCargando: boolean[];
  pedidoAbierto: boolean[];
  setPedidoAbierto: (e: SetStateAction<boolean[]>) => void;
  dict: Dictionary;
  enviarMensaje: () => Promise<void>;
  mensajeCargando: boolean;
  conversacion: DecodedMessage<any>[];
  conversacionCargando: boolean;
  abierta: {
    conversacion: boolean;
    envio: boolean;
  };
  setAbierta: (
    e: SetStateAction<{
      conversacion: boolean;
      envio: boolean;
    }>
  ) => void;
  mensaje: string;
  setMensaje: (e: SetStateAction<string>) => void;
  address: `0x${string}` | undefined;
  mensajeRef: MutableRefObject<HTMLVideoElement | undefined>;
};

export interface Pedido {
  total: string;
  orderId: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  fulfillment?: Details | EncryptedDetails;
  subOrders: {
    images: string[];
    type: string;
    color?: string;
    tamano?: string;
    amount: number;
    subTotal: number;
    currency: string;
    id: number;
  }[];
  decrypted: boolean;
}

export interface EncryptedDetails {
  ciphertext: string;
  dataToEncryptHash: string;
  accessControlConditions: AccessControlConditions | undefined;
}

export type ConversacionProps = {
  mensaje: string;
  setMensaje: (e: SetStateAction<string>) => void;
  enviarMensaje: () => Promise<void>;
  mensajeCargando: boolean;
  conversacion: DecodedMessage<any>[];
  conversacionCargando: boolean;
  address: `0x${string}` | undefined;
  dict: Dictionary;
  mensajeRef: MutableRefObject<HTMLVideoElement | undefined>;
};

export type CuentaProps = {
  dict: Dictionary;
  perfil: Profile;
  npcCargando: boolean;
  npc?: Sprite;
  seguirNpc: () => Promise<void>;
  dejarNpc: () => Promise<void>;
  seguirCargando: boolean;
  lensConectado: Profile | undefined;
};
