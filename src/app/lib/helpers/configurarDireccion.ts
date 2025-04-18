import { Direccion } from "@/app/components/Common/types/common.types";

export const configurarDireccion = (
    key: string,
    direccion: Direccion
  ): string => {
    return `${direccion}-${key}`;
  };
  