import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";
import { FunctionComponent, JSX, useContext } from "react";
import { Coleccion, Sprite } from "../../Common/types/common.types";
import { AgentScore } from "../types/index.type";
import { AccountStats } from "@lens-protocol/client";
import { ModalContext } from "@/app/providers";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const Tabla: FunctionComponent<{
  lang: string;
  dict: any;
  agentCollectionsCargando: boolean;
  agentCollections: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[];
}> = ({
  lang,
  dict,
  agentCollections,
  agentCollectionsCargando,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
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
                      <div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa bg-costa cursor-pointer"
                        onClick={() =>
                          contexto?.setMostrarPerfil(
                            agentCollections?.[0]?.account?.address
                          )
                        }
                      >
                        {agentCollections?.[0]?.account?.metadata?.picture && (
                          <Image
                            src={handleProfilePicture(
                              agentCollections?.[0]?.account?.metadata?.picture
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
                      {agentCollections?.[0]?.historial?.scores?.reduce(
                        (sum, el) => sum + Number(el.metadata?.global),
                        0
                      ) || 0}
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
                      <div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa bg-costa cursor-pointer"
                        onClick={() =>
                          contexto?.setMostrarPerfil(
                            agentCollections?.[1]?.account?.address
                          )
                        }
                      >
                        {agentCollections?.[1]?.account?.metadata?.picture && (
                          <Image
                            src={handleProfilePicture(
                              agentCollections?.[1]?.account?.metadata?.picture
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
                      {agentCollections?.[1]?.historial?.scores?.reduce(
                        (sum, el) => sum + Number(el.metadata?.global),
                        0
                      ) || 0}
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
                      <div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center border border-costa bg-costa cursor-pointer"
                        onClick={() =>
                          contexto?.setMostrarPerfil(
                            agentCollections?.[2]?.account?.address
                          )
                        }
                      >
                        {agentCollections?.[2]?.account?.metadata?.picture && (
                          <Image
                            src={handleProfilePicture(
                              agentCollections?.[2]?.account?.metadata?.picture
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
                    <div className="relative w-full h-fit flex items-center justify-end break-all text-2xl">
                      {agentCollections?.[2]?.historial?.scores?.reduce(
                        (sum, el) => sum + Number(el.metadata?.global),
                        0
                      ) || 0}
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
                  dict.Home.scoreW,
                  dict.Home.scoreG,
                  "$AU",
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
                  {agentCollections?.length > 0 && !agentCollectionsCargando
                    ? agentCollections.map((tab, i: number) => {
                        return (
                          <div
                            key={i}
                            className={`relative w-full h-10 flex text-left items-center px-3 sm:px-8 md:px-14 ${
                              i % 2 == 0 ? "bg-costa" : "bg-black"
                            }`}
                          >
                            <div className="relative w-full h-full flex items-center justify-between z-100 gap-3 flex-row justify-between font-clar text-white">
                              <div className="relative w-fit h-fit flex items-center justify-center">
                                <div className="relative w-6 h-fit flex items-center justify-center">
                                  {i + 1}
                                </div>
                              </div>
                              <div className="relative w-fit h-fit flex items-center justify-center">
                                <div
                                  className="relative w-6 h-6 rounded-full flex items-center justify-center border border-costa bg-costa cursor-pointer"
                                  onClick={() =>
                                    contexto?.setMostrarPerfil(
                                      tab?.account?.address
                                    )
                                  }
                                >
                                  {tab?.account?.metadata?.picture && (
                                    <Image
                                      src={handleProfilePicture(
                                        tab?.account?.metadata?.picture
                                      )}
                                      layout="fill"
                                      objectFit="cover"
                                      className="rounded-full"
                                      draggable={false}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="relative font-at w-fit h-fit flex items-center justify-center">
                                <div className="relative font-at w-28 h-fit flex items-center justify-center">
                                  {Number(
                                    tab?.account?.username?.localName?.length
                                  ) > 10
                                    ? tab?.account?.username?.localName?.substring(
                                        0,
                                        10
                                      )
                                    : tab?.account?.username?.localName}
                                </div>
                              </div>
                              <div className="relative w-fit h-fit flex items-center justify-center">
                                <div className="relative w-6 h-fit flex items-center justify-center">
                                  {tab?.historial?.scores?.reduce(
                                    (sum, el) =>
                                      sum + Number(el.metadata?.collections),
                                    0
                                  ) || 0}
                                </div>
                              </div>
                              <div className="relative w-fit h-fit flex items-center justify-center">
                                <div className="relative w-6 h-fit flex items-center justify-center text-rayas">
                                  {tab?.historial?.scores?.reduce(
                                    (sum, el) =>
                                      sum + Number(el.metadata?.global),
                                    0
                                  ) || 0}
                                </div>
                              </div>
                              <div className="relative w-fit h-fit flex items-center justify-center">
                                <div className="relative w-12 h-fit flex items-center justify-center text-rayas">
                                  {(
                                    tab?.historial?.auEarnedTotal || 0
                                  )?.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : Array.from({ length: 100 }).map((_, i) => {
                        return (
                          <div
                            key={i}
                            className={`relative w-full h-10 flex text-left items-center gap-3 flex-row justify-between animate-pulse ${
                              i % 2 == 0 ? "bg-costa" : "bg-black"
                            }`}
                          >
                            {i == 0 && (
                              <div className="text-xxs break-all text-white font-lib text-center w-full h-fit">
                                {dict.Home.leaderboard}
                              </div>
                            )}
                          </div>
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
};

export default Tabla;
