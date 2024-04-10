export enum Direccion {
  Izquierda = "izquierda",
  Derecha = "derecha",
  Arriba = "arriba",
  Abajo = "abajo",
  IzquierdaArriba = "izquierdaArriba",
  IzquierdaAbajo = "izquierdaAbajo",
  DerechaArriba = "derechaArriba",
  DerechaAbajo = "derechaAbajo",
}

export type LogProps = {
  connected: boolean;
  openConnectModal: (() => void) | undefined;
  t: any;
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
