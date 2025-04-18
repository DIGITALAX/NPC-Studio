"use client";

import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";

export default function Cargando() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full min-h-screen flex items-center justify-center bg-black z-300"
      id="juego"
    >
      <div className="relative flex justify-center items-center flex-col gap-4">
        <div className="w-20 h-20 relative flex items-center justify-center animate-pulse">
          <Image
            width={298}
            height={226}
            priority
            draggable={false}
            src={`${INFURA_GATEWAY}/ipfs/QmXMzhCBRuwFY6tbvTpNvPVageuK63eNzJ2KWkMGNrUCrw`}
          />
        </div>
      </div>
    </div>
  );
}
