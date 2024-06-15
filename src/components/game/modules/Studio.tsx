"use client";

import { SetStateAction } from "react";
import useConfig from "../hooks/useConfig";
import PantallaComprar from "@/components/common/modules/PantallaComprar";

function Studio({
  npc,
  escena,
  setNpc,
  setCargando,
  cargando,
  manejarMostrarArticulo,
  setManejarMostrarArticulo,
}: {
  npc: string;
  escena: string;
  setNpc: (e: SetStateAction<string>) => void;
  setCargando: (e: SetStateAction<boolean>) => void;
  cargando: boolean;
  setManejarMostrarArticulo: (e: SetStateAction<string | undefined>) => void;
  manejarMostrarArticulo: string | undefined;
}) {
  const { gameRef } = useConfig(
    npc,
    escena,
    setNpc,
    setCargando,
    setManejarMostrarArticulo
  );
  return (
    <>
      <div
        ref={gameRef as any}
        className={`relative w-full h-full flex items-start justify-start ${
          cargando && "animate-pulse"
        }`}
      />
      {manejarMostrarArticulo && (
        <PantallaComprar
          manejarMostrarArticulo={manejarMostrarArticulo}
          setManejarMostrarArticulo={setManejarMostrarArticulo}
        />
      )}
    </>
  );
}

export default Studio;
