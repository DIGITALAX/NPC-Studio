import { FunctionComponent } from "react";
import usePuntaje from "../hooks/usePuntaje";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const Puntaje: FunctionComponent<{
  juego?: boolean;
  dict: any;
}> = ({ juego, dict }) => {
  const { historial, puntajeCargando } = usePuntaje();
  return (
    <div
      className={`relative w-full flex flex-col md:flex-row gap-3 items-center justify-center ${
        juego ? "h-full" : "h-fit"
      }`}
    >
      <div className="relative w-full h-fit items-start justify-between overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {historial?.length < 1 || puntajeCargando
          ? Array.from({ length: juego ? 20 : 6 }).map((_, indice) => {
              return (
                <div
                  key={indice}
                  className={`relative w-full h-60 flex sm:flex-row flex-col items-center p-4 justify-center animate-pulse border-4 border-flor ${
                    indice % 2 == 0 ? "bg-salmon" : "bg-viol"
                  }`}
                ></div>
              );
            })
          : historial
              ?.slice(0, juego ? 20 : 6)
              .map((elemento, indice: number) => {
                return (
                  <div
                    key={indice}
                    className={`relative p-4 w-full h-60 flex sm:flex-row flex-col items-center justify-center border-4 border-flor ${
                      indice % 2 == 0 ? "bg-salmon" : "bg-viol"
                    }`}
                  >
                    <div className="relative w-full sm:absolute z-10 top-0 left-0 sm:w-1/2 h-full flex">
                      <Image
                        src={`${INFURA_GATEWAY}/ipfs/QmfBWguNxhoJqvuom7hc5r3FNztMnLZNgyA1CX3GjAugFs`}
                        layout="fill"
                        objectFit="fill"
                        draggable={false}
                      />
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center flex-col sm:flex-row gap-4 p-1">
                      <div className="relative w-full justify-end items-center flex h-fit">
                        <div className="relative w-fit h-fit flex items-center justify-center">
                          <div className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa bg-costa">
                            {elemento?.scorerProfile?.metadata?.picture && (
                              <Image
                                src={handleProfilePicture(
                                  elemento?.scorerProfile?.metadata?.picture
                                )}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                                draggable={false}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="relative w-3/5 justify-between items-center flex h-full flex-col">
                        <div className="relative w-full h-fit flex items-center justify-end text-2xl">
                          {elemento?.metadata?.global || 0}
                        </div>
                        <div className="relative w-full h-8 flex items-center justify-center">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/QmY827FfqYeW6JMXjtcAhh8FEa8K6eckjf7R5VVaXZrBp3`}
                            layout="fill"
                            objectFit="fill"
                            draggable={false}
                          />
                        </div>
                        <div className="relative w-full h-fit flex items-center justify-end text-white text-2xl">
                          {dict.Home.global}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
      </div>
    </div>
  );
};

export default Puntaje;
