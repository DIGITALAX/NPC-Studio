import { FunctionComponent } from "react";
import Agentes from "./Agentes";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import Puntaje from "./Puntaje";
import { CambioProps, Pantalla } from "../types/agentes.types";

const Cambio: FunctionComponent<CambioProps> = ({
  pantallaCambio,
  lang,
  dict,
}): JSX.Element => {
  switch (pantallaCambio) {
    case Pantalla.Desafiante:
      return <div></div>;

    case Pantalla.Especte:
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
              lang == "en" ? "text-[10vw]" : "text-[8vw]"
            }`}
          >
            {dict.Home.espect}
          </div>
          <div className="relative w-full h-fit py-20 flex items-center justify-center pr-4">
            <div className="relative w-full h-fit flex flex-row gap-10 items-center justify-center">
              <div className="relative w-full h-[32rem] flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/Qmab2a5syZ5rVB6oHQV12Lrruzyzx5A1oyC1RWdQsK8Mt6`}
                  layout="fill"
                  objectFit="fill"
                  draggable={false}
                />
              </div>
              <div className="relative w-full h-[32rem] flex flex-col items-center justify-center gap-6">
                <div className="relative w-full h-full flex items-center justify-end flex-row gap-3">
                  <div className="relative text-base flex items-center justify-center font-lib text-white rotate-90">
                    {dict.Home.rango + " 100"}
                  </div>
                  <div className="relative w-3/5 h-full flex items-center justify-center border-4 rounded-md border-azulito bg-[#C993FF] flex-col justify-between gap-4 items-stretch p-2">
                    <div className="relative w-full h-full flex flex-row gap-4 justify-between items-start">
                      <div className="relative w-fit h-fit items-center justify-start font-at text-white text-2xl">
                        @handle
                      </div>
                      <div className="relative w-fit h-fit items-center justify-start">
                        <div className="rounded-full w-28 h-28 border border-azulito">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                            draggable={false}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full h-full flex flex-row gap-4 justify-between items-end font-vcr text-3xl">
                      <div className="relative w-fit h-fit items-center justify-start">
                        193
                      </div>
                      <div className="relative w-fit h-fit items-center justify-start text-white">
                        $AU
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-full flex items-center justify-center border-4 p-3 flex-col gap-3 rounded-md border-[#FFFF6E]">
                  <div className="relative w-full h-20 flex border bg-[#00FFFF]/60 border-[#6FFA95] flex-row items-center justify-between p-1 gap-3 text-[#F6FC8D] font-super text-lg">
                    <div className="relative w-fit h-fit items-center justify-start">
                      $AU
                    </div>
                    <div className="relative w-fit h-fit items-center justify-start">
                      300
                    </div>
                  </div>
                  <div className="h-px w-full bg-[#CC04FD]"></div>
                  <div className="relative w-full h-full flex items-start justify-start flex-row gap-3">
                    <div className="relative w-full h-full items-start justify-between flex-col flex gap-3 text-white">
                      <div className="font-vcr text-2xl text-left w-fit h-fit flex">
                        algo
                      </div>
                      <div className="font-super text-lg text-left w-fit h-fit flex">
                        algo $AU
                      </div>
                    </div>
                    <div className="relative w-fit h-full flex items-end justify-end">
                      <div className="relative w-20 h-8 flex items-center justify-center cursor-pointer hover:opacity-70">
                        <Image
                          src={`${INFURA_GATEWAY}/ipfs/QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
                          layout="fill"
                          objectFit="fill"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmdRLJ8bWfTgJ92TiXTQU4wU46xtYURebNNRC4qyBMkCN8`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      );

    case Pantalla.Tabla:
      return <div></div>;

    default:
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
              lang == "en" ? "text-[8vw]" : "text-[6vw]"
            }`}
          >
            {dict.Home.scorecard}
          </div>
          <div className="relative w-full h-fit py-20 flex items-center justify-center flex-col gap-24">
            <Puntaje />
            <div className="relative w-fit h-fit flex items-center justify-center flex-col gap-3">
              <div className="relative w-52 h-52 rounded-full flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmVUd78Y5zAjsF6saC4SnRmQYAqnqTrTNRLErGBKz7zbZY`}
                  layout="fill"
                  objectFit="cover"
                  draggable={false}
                />
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center break-words font-clar text-[#A9FDCA]">
                algo de texto
              </div>
            </div>
            <Agentes />
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmTPTQ7w3ZWETDBwsC5HB2TkcHTik85Hpy9thbXZg6nREw`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      );
  }
};

export default Cambio;
