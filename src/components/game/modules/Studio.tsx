"use client";

import { SetStateAction } from "react";
import useConfig from "../hooks/useConfig";

function Studio({
  npc,
  escena,
  setNpc,
  setCargando,
  cargando,
}: {
  npc: string;
  escena: string;
  setNpc: (e: SetStateAction<string>) => void;
  setCargando: (e: SetStateAction<boolean>) => void;
  cargando: boolean;
}) {
  const { gameRef } = useConfig(npc, escena, setNpc, setCargando);
  return (
    <div
      ref={gameRef as any}
      className={`relative w-full h-full flex items-start justify-start ${
        cargando && "animate-pulse"
      }`}
    />
  );
}

export default Studio;
