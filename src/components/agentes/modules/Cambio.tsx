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
  todosLosNPCs,
  router,
  setMostrarMas,
  mostrarMas,
  npcsCargando,
  informacion,
  escenas
}): JSX.Element => {
  switch (pantallaCambio) {
    case Pantalla.Desafiante:
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
              lang == "en" ? "text-[8vw]" : "text-[6vw]"
            }`}
          >
            {dict.Home.chall}
          </div>
          <div className="relative w-full h-fit flex items-center justify-center flex-col lg:flex-row gap-14 ">
            <div className="relative flex w-full h-96 items-center justify-center flex-col">
              <div className="absolute items-center justify-center flex w-full xl:w-3/4 h-full">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmPQaDcs5gEYtrqXsz3pvLzu3919a4BXmBAE8McrZyJEor`}
                  layout="fill"
                  objectFit="fill"
                  draggable={false}
                />
              </div>
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              <div className="relative flex w-20 h-20 items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmXLzPsvnzcEnLgBWpkVFSCbG3gKUU2Sfewi6JoNzmvrTs`}
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                />
              </div>
            </div>
            <div className="relative w-full h-96 items-center justify-center flex flex-col">
              <div className="absolute flex w-full xl:w-3/4 h-full items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmXBVuPh7ZAC6wsPRNiGAwFuWzm1XGjQprD6wYYtk2XzAh`}
                  layout="fill"
                  objectFit="fill"
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className="rounded-sm py-10 relative w-full h-[80rem] border-4 border-flor bg-gris"></div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmRAcBfJGebTPihDVgryhVUa3PtmtVEb4UMvbdqmwC3RUi`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      );

    case Pantalla.Espectador:
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
              lang == "en" ? "text-[10vw]" : "text-[8vw]"
            }`}
          >
            {dict.Home.espectar}
          </div>
          <div className="relative w-full h-fit py-20 flex items-center justify-center sm:pr-4">
            <div className="relative w-full h-fit flex flex-col xl:flex-row gap-10 items-center justify-center">
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
                  <div className="relative w-3/5 h-full flex items-center justify-center border-4 rounded-md border-azulito bg-viol flex-col justify-between gap-4 items-stretch p-2">
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
                <div className="relative w-full h-full flex items-center justify-center border-4 p-3 flex-col gap-3 rounded-md border-sol">
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
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
              lang == "en" ? "text-[10vw]" : "text-[8vw]"
            }`}
          >
            {dict.Home.leader}
          </div>
          <div className="relative w-full h-fit py-20 flex items-center justify-center sm:pr-4">
            <div className="relative w-full h-fit flex flex-col gap-10 items-start justify-center">
              <div className="relative w-full h-fit flex items-center justify-center flex-col gap-6 font-vcr">
                <div className="relative w-full h-fit flex items-center justify-between flex-col sm:flex-row gap-8">
                  <div className="relative w-full h-fit sm:h-44 flex sm:flex-row flex-col items-center justify-center border-4 border-flor bg-salmon">
                    <div className="relative w-full sm:absolute z-10 top-0 left-0 sm:w-1/2 h-60 sm:h-full flex">
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
                          <div className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa">
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
                      <div className="relative w-3/5 justify-between items-center flex h-full flex-col">
                        <div className="relative w-full h-fit flex items-center justify-end text-2xl">
                          193
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
                          $AU
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-fit sm:h-44 flex items-center justify-center border-4 border-flor bg-viol sm:-top-20 sm:flex-row flex-col">
                    <div className="relative w-full sm:absolute z-10 top-0 left-0 sm:w-1/2 h-60 sm:h-full flex">
                      <Image
                        src={`${INFURA_GATEWAY}/ipfs/QmaT9VM3Rqb4NRGmrjm7EAKMFXFZertxadqTTA7CeKy7NN`}
                        layout="fill"
                        objectFit="fill"
                        draggable={false}
                      />
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center flex-col sm:flex-row gap-4 p-1">
                      <div className="relative w-full justify-end items-center flex h-fit">
                        <div className="relative w-fit h-fit flex items-center justify-center">
                          <div className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa">
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
                      <div className="relative w-3/5 justify-between items-center flex h-full flex-col">
                        <div className="relative w-full h-fit flex items-center justify-end text-2xl">
                          193
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
                          $AU
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-fit sm:h-44 flex items-center justify-center border-4 border-flor bg-salmon sm:flex-row flex-col">
                    <div className="relative w-full sm:absolute z-10 top-0 left-0 sm:w-1/2 h-60 sm:h-full flex">
                      <Image
                        src={`${INFURA_GATEWAY}/ipfs/QmV3Tu48mvZ5p7F3yktSW6KHr23FqjucY2XWvr8x5nM9UV`}
                        layout="fill"
                        objectFit="fill"
                        draggable={false}
                      />
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center flex-col sm:flex-row gap-4 p-1">
                      <div className="relative w-full justify-end items-center flex h-fit">
                        <div className="relative w-fit h-fit flex items-center justify-center">
                          <div className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa">
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
                      <div className="relative w-3/5 justify-between items-center flex h-full flex-col">
                        <div className="relative w-full h-fit flex items-center justify-end break-all text-2xl">
                          193
                        </div>
                        <div className="relative w-full h-8 flex items-center justify-center">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/QmY827FfqYeW6JMXjtcAhh8FEa8K6eckjf7R5VVaXZrBp3`}
                            layout="fill"
                            objectFit="fill"
                            draggable={false}
                          />
                        </div>
                        <div className="relative w-full h-fit flex items-center justify-end break-all text-white text-2xl">
                          $AU
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-fit sm:h-20 flex items-stretch justify-between flex-col gap-3 border-t-4 border-b border-x-4 border-white rounded-md">
                  <div className="relative w-full h-fit sm:h-full bg-gris flex flex-row items-center justify-center sm:justify-between text-xxs font-clar text-black sm:flex-nowrap flex-wrap">
                    <div className="relative justify-start items-center gap-1.5 flex flex-row">
                      <div className="bg-limon w-fit h-fit py-1 px-2 rounded-sm flex items-center justify-center text-center">
                        score
                      </div>
                      <div className="bg-crema border py-1 px-2 border-zana w-fit h-fit rounded-sm flex items-center justify-center text-center">
                        $AU
                      </div>
                      <div className="bg-crema border py-1 px-2 border-zana w-fit h-fit break-all rounded-sm flex items-center justify-center text-center">
                        Activity
                      </div>
                      <div className="bg-crema border py-1 px-2 border-zana w-fit h-fit break-all rounded-sm flex items-center justify-center text-center">
                        Variance
                      </div>
                    </div>
                    <div className="relative justify-end items-center gap-1.5 flex flex-row">
                      <div className="bg-zana w-fit h-fit py-1 px-2 rounded-sm flex items-center break-all justify-center text-center">
                        Weekly
                      </div>
                      <div className="bg-crema border py-1 px-2 border-zana w-fit h-fit rounded-sm flex items-center justify-center text-center break-all">
                        All Time
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-10 sm:h-full flex items-center justify-center">
                    <input
                      className="focus:outline-none bg-black w-full h-full relative text-center font-clar text-base text-verde placeholder:text-verde placeholder:opacity-100"
                      placeholder={dict.Home.buscar}
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-full h-[80rem] flex flex-col items-center justify-center gap-6">
                <div
                  className="absolute top-72 left-0 w-full flex items-start justify-start flex-col px-10 pb-10"
                  style={{ height: "calc(100% - 18rem)" }}
                >
                  <div className="relative w-full h-10 flex text-left items-start gap-3 flex-row justify-between  overflow-x-scroll">
                    {[
                      dict.Home.rango,
                      dict.Home.espectador,
                      dict.Home.score,
                      "$AU",
                      "Total $AU",
                    ].map((texto: string, indice: number) => {
                      return (
                        <div
                          key={indice}
                          className="relative w-full h-fit flex items-center justify-center text-center text-white font-bit text-xxs"
                        >
                          {texto}
                        </div>
                      );
                    })}
                  </div>
                  <div className="relative flex w-full h-full overflow-y-scroll overflow-x-scroll">
                    <div className="relative w-full h-fit items-start justify-start overflow-y-scroll  overflow-x-scroll flex flex-col">
                      {Array.from({ length: 100 }).map((_, i) => {
                        return (
                          <div
                            key={i}
                            className={`relative w-full h-10 flex text-left items-start gap-3 flex-row justify-between ${
                              i % 2 == 0 ? "bg-costa" : "bg-black"
                            }`}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="relative flex w-full h-full">
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/QmaYXpZxX8mc2G52aRycB5eHofvmGYtEKotJsuze9gehUH`}
                    layout="fill"
                    objectFit="fill"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmZ3fqF7shCsNbAUuFLvSz3Mg8ARKsvXmJaTmN6GWA3SNB`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      );

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
              <div className="relative w-32 md:w-52 h-32 md:h-52 rounded-full flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmVUd78Y5zAjsF6saC4SnRmQYAqnqTrTNRLErGBKz7zbZY`}
                  layout="fill"
                  objectFit="cover"
                  draggable={false}
                />
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center break-words font-clar text-limon">
                algo de texto
              </div>
            </div>
            <Agentes
              router={router}
              mostrarMas={mostrarMas}
              setMostrarMas={setMostrarMas}
              todosLosNPCs={todosLosNPCs}
              dict={dict}
              npcsCargando={npcsCargando}
              informacion={informacion}
              escenas={escenas}
            />
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
