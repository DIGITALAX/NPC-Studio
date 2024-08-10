import {
  AutographType,
  Coleccion,
  DatosOraculos,
  Dictionary,
} from "@/components/game/types/game.types";
import { SetStateAction } from "react";
import { Profile } from "../../../../graphql/generated";

export type ComprasCambioProps = {
  manejarMostrarArticulo:
    | {
        etiqueta: string;
        disenadores: string[];
        tipo: AutographType;
      }
    | undefined;
  dict: Dictionary;
  articuloIndice: number;
  setArticuloIndice: (e: SetStateAction<number>) => void;
  articulosActuales: Catalogo[] | Coleccion[] | undefined;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
  comprarPublicacion: (articulo: Compra) => Promise<void>;
  carritoCargando: boolean;
  articuloSeleccionado: Compra[];
  aprobarCargando: boolean;
  gastosAprobados: { token: string; aprobado: boolean }[];
  setCumplimiento: (e: SetStateAction<Details>) => void;
  datosOraculos: DatosOraculos[];
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  aprobarGastos: (
    token: string,
    precio: number,
    indice: number
  ) => Promise<void>;
  carrito: {
    compras: Compra[];
    abierto: boolean;
  };
  cumplimiento: Details;
  comprarCarrito: () => Promise<void>;
  pagina: number;
  setMostrarPerfil: (
    e: SetStateAction<
      | string
      | undefined
    >
  ) => void;
  setPagina: (e: SetStateAction<number>) => void;
};

export type BotonesProps = {
  indice: number;
  comprarPublicacion?: (elemento: Compra) => Promise<void>;
  carritoCargando: boolean;
  articulo: Compra;
  dict: Dictionary;
  aprobarCargando?: boolean;
  aprobarGastos?: (
    token: string,
    precio: number,
    indice: number
  ) => Promise<void>;
  gastosAprobados?: { token: string; aprobado: boolean };
  agotado?: boolean;
  minteado: number;
  cantidad: number;
  precio: number;
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  datosOraculos: DatosOraculos[];
};

export type AutografoProps = {
  dict: Dictionary;
  articulos: Coleccion[];
  datosOraculos: DatosOraculos[];
  aprobarCargando: boolean;
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  aprobarGastos: (
    token: string,
    precio: number,
    indice: number
  ) => Promise<void>;
  articuloIndice: number;
  setArticuloIndice: (e: SetStateAction<number>) => void;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  setMostrarPerfil: (
    e: SetStateAction<
      | string
      | undefined
    >
  ) => void;
  carrito: {
    compras: Compra[];
    abierto: boolean;
  };
  gastosAprobados: { token: string; aprobado: boolean }[];
  comprarPublicacion: (articulo: Compra) => Promise<void>;
  carritoCargando: boolean;
  articuloSeleccionado: Compra[];
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
};

export type RopasProps = {
  dict: Dictionary;
  articulos: Coleccion[];
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  datosOraculos: DatosOraculos[];
  aprobarCargando: boolean;
  comprarPublicacion: (articulo: Compra) => Promise<void>;
  carritoCargando: boolean;
  setCumplimiento: (e: SetStateAction<Details>) => void;
  cumplimiento: Details;
  setMostrarPerfil: (
    e: SetStateAction<
      | string
      | undefined
    >
  ) => void;
  articuloSeleccionado: Compra[];
  aprobarGastos: (
    token: string,
    precio: number,
    indice: number
  ) => Promise<void>;
  articuloIndice: number;
  setArticuloIndice: (e: SetStateAction<number>) => void;
  carrito: {
    compras: Compra[];
    abierto: boolean;
  };
  gastosAprobados: { token: string; aprobado: boolean }[];
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
};

export type MezclaProps = {
  dict: Dictionary;
  articuloSeleccionado: Compra[];
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
  setMostrarPerfil: (
    e: SetStateAction<
      | string
      | undefined
    >
  ) => void;
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  articulos: Coleccion[];
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
};

export type CatalogoProps = {
  dict: Dictionary;
  catalogo: Catalogo;
  articuloSeleccionado: Compra[];
  carrito: {
    compras: Compra[];
    abierto: boolean;
  };
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void;
  comprarPublicacion: (articulo: Compra) => Promise<void>;
  setCumplimiento: (e: SetStateAction<Details>) => void;
  cumplimiento: Details;
  pagina: number;
  setPagina: (e: SetStateAction<number>) => void;
  datosOraculos: DatosOraculos[];
  carritoCargando: boolean;
  aprobarCargando: boolean;
  gastosAprobados: { token: string; aprobado: boolean }[];
  aprobarGastos: (
    token: string,
    precio: number,
    indice: number
  ) => Promise<void>;
  setArticuloSeleccionado: (e: SetStateAction<Compra[]>) => void;
  setVerImagen: (
    e: SetStateAction<{
      abierto: boolean;
      tipo: string;
      url: string;
    }>
  ) => void;
};

export interface Catalogo {
  paginas: string[];
  tokenes: string[];
  uri: string;
  disenador: string;
  precio: number;
  id: number;
  pubId: number;
  profileId: number;
  cantidad: number;
  minteado: number;
  paginasContadas: number;
  profile: Profile | undefined;
  tipo: AutographType;
}

export interface Mezcla {
  maximo: number;
}

export interface Compra {
  elemento: Catalogo | Coleccion | Mezcla;
  cantidad: number;
  tipo: AutographType;
  color: string;
  tamano: string;
  token: string;
}

export interface Details {
  nombre: string;
  lens: string;
  direccion: string;
  zip: string;
  ciudad: string;
  estado: string;
  pais: string;
}

export type CumplimientoProps = {
  dict: Dictionary;
  setCumplimiento: (e: SetStateAction<Details>) => void;
  cumplimiento: Details;
  color?: string;
  setColor?: (e: string) => void;
  tamano?: string;
  setTamano?: (e: string) => void;
  abierto?: boolean
};
