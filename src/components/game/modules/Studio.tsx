"use client";

import { SetStateAction } from "react";
import useConfig from "../hooks/useConfig";

function Studio({
  npc,
  escena,
  setNpc,
}: {
  npc: string;
  escena: string;
  setNpc: (e: SetStateAction<string>) => void;
}) {
  const { gameRef } = useConfig(npc, escena, setNpc);
  return (
    <div
      ref={gameRef as any}
      className="relative w-full h-full flex items-start justify-start"
    />
  );
}

export default Studio;
