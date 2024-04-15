"use client";
import useConfig, {
  PhaserGameElement,
} from "@/components/game/hooks/useConfig";
import { RefObject } from "react";

function Studio({ npc }: { npc: number }) {
  const { gameRef } = useConfig(npc);

  return (
    <div
      ref={gameRef as RefObject<PhaserGameElement> as any}
      className="relative w-full h-full flex items-start justify-start"
    />
  );
}

export default Studio;
