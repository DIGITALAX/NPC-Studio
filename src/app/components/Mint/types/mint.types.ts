import { ChangeEvent } from "react";
import { Coleccion } from "../../Common/types/common.types";

export type MintProps = {
  dict: any;
};

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
  dict: any;
};

export interface Galeria {
  galleryId: string;
  metadata: {
    image: string;
    title: string;
  };
  collectionIds: string[];
  colecciones: Coleccion[];
}
