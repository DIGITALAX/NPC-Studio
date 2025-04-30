import { CARTAS, INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import { AnimationContext, ModalContext } from "@/app/providers";
import Image from "next/legacy/image";
import { FunctionComponent, useContext } from "react";
import { AgentMapProps } from "../types/index.type";
import { useRouter } from "next/navigation";
import useMap from "../hooks/useMap";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const AgentMap: FunctionComponent<AgentMapProps> = ({
  dict,
  agentCollections,
  agentCollectionsCargando,
}) => {
  const contexto = useContext(ModalContext);
  const animContexto = useContext(AnimationContext);
  const router = useRouter();
  const { mostrarMas, setMostrarMas } = useMap();

  return (
    <div className="relative w-full h-fit flex flex-col items-center justify-center gap-8">
      <div className="relative w-full h-fit grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 gap-6">
        {agentCollectionsCargando ||
        Number(contexto?.escenas?.length) < 1 ||
        agentCollections?.length < 1
          ? CARTAS.map((elemento: string, i: number) => {
              return (
                <div
                  key={i}
                  className="relative w-full h-96 flex items-stretch justify-start flex-col animate-pulse"
                >
                  <Image
                    src={`${INFURA_GATEWAY_INTERNAL}${elemento}`}
                    layout="fill"
                    objectFit="fill"
                    draggable={false}
                  />
                </div>
              );
            })
          : (mostrarMas ? agentCollections : agentCollections?.slice(0, 9)).map(
              (sprite, i: number) => {
                return (
                  <div
                    key={i}
                    className="relative w-full h-96 flex items-stretch justify-start flex-col gap-4 p-5"
                  >
                    <div className="absolute top-0 left-0 w-full h-full flex">
                      <Image
                        src={`${INFURA_GATEWAY_INTERNAL}${CARTAS[i % 9]}`}
                        layout="fill"
                        objectFit="fill"
                        draggable={false}
                      />
                    </div>
                    <div className="relative w-full h-fit flex flex-row items-center justify-between gap-3 bg-black/40 p-1 rounded-md">
                      <div className="relative flex flex-row w-full h-full text-white font-aust items-center justify-center gap-2">
                        <div
                          className={`relative rounded-full flex bg-black w-6 h-6 items-center justify-center`}
                        >
                          <Image
                            src={handleProfilePicture(
                              sprite?.account?.metadata?.picture
                            )}
                            objectFit="cover"
                            alt="pfp"
                            layout="fill"
                            className="relative w-fit h-fit rounded-full items-center justify-center flex"
                            draggable={false}
                          />
                        </div>
                        <div className="relative items-center justify-center w-fit h-fit text-xs flex break-all">
                          {sprite?.account?.username?.localName}
                        </div>
                      </div>
                      <div className="relative w-full h-fit flex items-center justify-center">
                        <div
                          className="relative w-24 text-xs font-bit text-viol h-8 flex items-center justify-center cursor-pointer hover:opacity-70"
                          onClick={() => {
                            animContexto?.setPageChange(true);
                            router.push(
                              `/agent/${sprite?.account?.username?.localName}`
                            );
                          }}
                        >
                          <Image
                            src={`${INFURA_GATEWAY_INTERNAL}QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
                            layout="fill"
                            objectFit="fill"
                            draggable={false}
                          />
                          <div className="absolute w-full h-full flex items-center justify-center whitespace-nowrap">
                            {dict.Home.espectar}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full h-full flex flex-row items-center justify-between gap-3">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={`${INFURA_GATEWAY_INTERNAL}${sprite?.tapa}`}
                          layout="fill"
                          objectFit="contain"
                          draggable={false}
                        />
                      </div>
                      <div className="relative w-full h-fit bg-black/80 p-2 flex flex-col items-center justify-between gap-2 text-xxs font-super text-sol">
                        <div className="relative w-full h-px flex items-start justify-start bg-azulito"></div>
                        <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {dict.Home.auEarned}
                          </div>
                          <div className="relative w-fit h-fit flex items-center justify-center text-xxxs">
                            {(Number(sprite?.score?.auTotal) || 0)?.toFixed(
                              2
                            ) || 0}{" "}
                            $AU
                          </div>
                        </div>
                        <div className="relative w-full h-px flex items-start justify-start bg-[#F6FC8D]"></div>
                        <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {dict.Home.currentScore}
                          </div>
                          <div className="relative w-fit h-fit text-xxxs flex items-center justify-center">
                            {sprite?.score?.activity.reduce(
                              (sum, el) =>
                                sum + Number(el?.spectateMetadata?.global),
                              0
                            ) || 0}
                          </div>
                        </div>
                        <div className="relative w-full h-px flex items-start justify-start bg-[#09FF6B]"></div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
      </div>
      <div className="relative w-full h-fit flex items-center justify-center">
        <div
          className="relative w-32 text-xs font-bit text-viol h-8 flex items-center justify-center cursor-pointer hover:opacity-70"
          onClick={() =>
            !agentCollectionsCargando && setMostrarMas(!mostrarMas)
          }
        >
          <Image
            src={`${INFURA_GATEWAY_INTERNAL}QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
            layout="fill"
            objectFit="fill"
            draggable={false}
          />
          <div className="absolute w-full h-full flex items-center justify-center whitespace-nowrap">
            {mostrarMas ? dict.Home.mostrarMenos : dict.Home.mostrarMas}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentMap;
