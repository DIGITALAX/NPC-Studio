"use client";

import useConfig from "../hooks/useConfig";

function Studio({ npc, escena }: { npc: string; escena: string }) {
  const { gameRef } = useConfig(npc, escena);
  return (
    <div
      ref={gameRef as any}
      className="relative w-full h-full flex items-start justify-start"
    />
  );
}

export default Studio;
