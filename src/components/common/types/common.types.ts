import { ChangeEvent } from "react";

export type DropDownProps = {
  titulo: string;
  hashtag?: boolean;
  valor: string;
  manejarCambio?: (e: ChangeEvent) => void;
  estaAbierto: boolean;
  setEstaAbierto: () => void;
  valores: { cover: string; key: string }[];
  manejarElegir: (e: string) => void;
};
