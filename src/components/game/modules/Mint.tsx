"use client";
import { MintProps } from "../types/game.types";
import Process from "./Process";

function Mint({
  setArtists,
  artists,
  dict,
  manejarMintear,
  mintCargando,
}: MintProps) {
  return (
    <div
      className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setArtists(0)}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-black border border-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <Process
          mintCargando={mintCargando}
          manejarMintear={manejarMintear}
          dict={dict}
          setArtists={setArtists}
          artists={artists}
        />
      </div>
    </div>
  );
}

export default Mint;
