"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { VotoProps } from "../types/common.types";

function Voto({ setVoto, dict }: VotoProps) {
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setVoto(false)}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-oscuro border border-white cursor-default rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative relative w-[100vw] max-w-[64rem] h-[calc(100vw*(40/64))] max-h-[40rem] flex items-center justify-center">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmUsrPxWX5wcnmVGt5WykDgTNDM3KHsjSrMZSxZui5u4rC`}
            draggable={false}
            layout="fill"
            objectFit="cover"
          />
          <div
            className={`absolute top-0 right-0 w-full h-full flex flex-col items-center py-10 px-4 gap-5 text-white font-bit justify-center overflow-y-scroll sm:text-base text-sm`}
          >
            <div className="relative w-3/4 break-words h-fit flex text-center justify-center items-center">
              {dict.Home.voto}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voto;