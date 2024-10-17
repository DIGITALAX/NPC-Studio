"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { VotoProps } from "../types/common.types";

function Voto({ setVoto, voto, dict }: VotoProps) {
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setVoto(undefined)}
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
            className={`relative  w-[75%] h-[65%] flex flex-col items-center py-6 sm:py-10 px-4 gap-5 text-white font-bit justify-start sm:text-base text-sm overflow-y-scroll`}
          >
            <div className="relative w-full break-words h-fit flex text-center justify-center items-center">
              {voto?.mensaje}
            </div>
            {voto?.tokens && (
              <div className="relative w-full h-fit flex flex-col items-center justify-center text-center gap-3">
                <div className="relative w-fill break-words h-fit flex text-center justify-center items-center text-xxs">
                  {dict.Home.saldo}
                </div>
                <div className="relative w-full h-fit flex text-center justify-center items-center flex-wrap gap-3 sm:gap-6">
                  {voto?.tokens?.map(
                    (
                      token: {
                        titulo: string;
                        enlace: string;
                        tapa: string;
                        cantidad: number;
                        umbral: number;
                      },
                      indice
                    ) => {
                      return (
                        <div
                          key={indice}
                          className="w-fit h-fit flex items-center justify-center gap-2 flex-col"
                        >
                          <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-1">
                            <div
                              className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                              onClick={() => window.open(token?.enlace)}
                            >
                              <div className="relative w-3 h-3 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border border-white">
                                <Image
                                  draggable={false}
                                  className="rounded-full"
                                  objectFit="cover"
                                  src={`${INFURA_GATEWAY}/ipfs/${token?.tapa}`}
                                  layout="fill"
                                />
                              </div>
                            </div>
                            <div className="relative text-xxs w-fit h-fit flex items-center justify-center">
                              {token?.titulo}
                            </div>
                          </div>
                          <div className="relative text-xxs sm:text-xs w-fit h-fit flex items-center justify-center">
                            {token?.cantidad / 10 ** 18} /{" "}
                            {token?.umbral / 10 ** 18}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voto;
