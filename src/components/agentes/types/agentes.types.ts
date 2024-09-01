import { Dictionary } from "@/components/game/types/game.types";

export type CambioProps = {
  pantallaCambio: Pantalla;
  dict: Dictionary;
  lang: string;
};

export enum Pantalla {
  Puntaje,
  Especte,
  Tabla,
  Desafiante,
  Juego,
}
