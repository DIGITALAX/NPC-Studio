import { Direccion } from "@/components/game/types/game.types";

export const configurarDireccion = (
  key: string,
  direccion: Direccion
): string => {
  return `${direccion}-${key}`;
};
