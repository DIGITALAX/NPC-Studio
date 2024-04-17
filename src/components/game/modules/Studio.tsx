"use client";

import useLance from "../hooks/useLance";

function Studio({ npc }: { npc: number }) {
  const { gameRef } = useLance(npc);
  return (
    <div
      ref={gameRef as any}
      className="relative w-full h-full flex items-start justify-start"
    />
  );
}

export default Studio;
