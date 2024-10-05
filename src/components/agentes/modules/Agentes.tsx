import { Sprite } from "@/components/game/types/game.types";
import { CARTAS, INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { FunctionComponent } from "react";
import { AgentesProps } from "../types/agentes.types";
import createProfilePicture from "@/lib/helpers/createProfilePicture";

const Agentes: FunctionComponent<AgentesProps> = ({
  todosLosNPCs,
  mostrarMas,
  setMostrarMas,
  dict,
  router,
  npcsCargando,
  informacion,
  escenas,
}) => {
  return (
    <div className="relative w-full h-fit flex flex-col items-center justify-center gap-8">
      <div className="relative w-full h-fit grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 gap-6">
        {npcsCargando || escenas?.length < 1 || todosLosNPCs?.length < 1
          ? CARTAS.map((elemento: string, i: number) => {
              return (
                <div
                  key={i}
                  className="relative w-full h-96 flex items-stretch justify-start flex-col animate-pulse"
                >
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/${elemento}`}
                    layout="fill"
                    objectFit="fill"
                    draggable={false}
                  />
                </div>
              );
            })
          : (mostrarMas ? todosLosNPCs : todosLosNPCs?.slice(0, 9)).map(
              (sprite: Sprite, i: number) => {
                const profileImage = createProfilePicture(
                  informacion?.[i].perfil?.metadata?.picture
                );
                return (
                  <div
                    key={i}
                    className="relative w-full h-96 flex items-stretch justify-start flex-col gap-4 p-5"
                  >
                    <div className="absolute top-0 left-0 w-full h-full flex">
                      <Image
                        src={`${INFURA_GATEWAY}/ipfs/${CARTAS[i % 9]}`}
                        layout="fill"
                        objectFit="fill"
                        draggable={false}
                      />
                    </div>
                    <div className="relative w-full h-fit flex flex-row items-center justify-between gap-3 bg-black/40 p-1 rounded-md">
                      <div className="relative flex flex-row w-full h-full text-white font-aust items-center justify-center gap-2">
                        <div
                          className={`relative rounded-full flex bg-black w-6 h-6 items-center justify-center`}
                          id="pfp"
                        >
                          {profileImage && (
                            <Image
                              src={profileImage}
                              objectFit="cover"
                              alt="pfp"
                              layout="fill"
                              className="relative w-fit h-fit rounded-full items-center justify-center flex"
                              draggable={false}
                            />
                          )}
                        </div>
                        <div className="relative items-center justify-center w-fit h-fit text-xs flex break-all">
                          {
                            informacion?.[i]?.perfil?.handle?.suggestedFormatted
                              ?.localName
                          }
                        </div>
                      </div>
                      <div className="relative w-full h-fit flex items-center justify-center">
                        <div
                          className="relative w-24 text-xs font-bit text-viol h-8 flex items-center justify-center cursor-pointer hover:opacity-70"
                          onClick={() =>
                            router.push(
                              `/npc/${informacion?.[i]?.perfil?.handle?.suggestedFormatted?.localName}`
                            )
                          }
                        >
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
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
                          src={`${INFURA_GATEWAY}/ipfs/${sprite?.tapa_dos}`}
                          layout="fill"
                          objectFit="contain"
                          draggable={false}
                        />
                      </div>
                      <div className="realtive w-full h-fit bg-black/80 p-2 flex flex-col items-center justify-between gap-2 text-xxs font-super text-sol">
                        <div className="relative w-full h-px flex items-start justify-start bg-azulito"></div>
                        <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {dict.Home.auEarned}
                          </div>
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {informacion?.[i]?.auEarned} $AU
                          </div>
                        </div>
                        <div className="relative w-full h-px flex items-start justify-start bg-[#FF4EFF]"></div>
                        <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {dict.Home.activeJobs}
                          </div>
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {informacion?.[i]?.activeJobs}
                          </div>
                        </div>
                        <div className="relative w-full h-px flex items-start justify-start bg-[#F6FC8D]"></div>
                        <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {dict.Home.currentScore}
                          </div>
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {informacion?.[i]?.currentScore}
                          </div>
                        </div>
                        <div className="relative w-full h-px flex items-start justify-start bg-[#65B0FF]"></div>
                        <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {dict.Home.rentPaid}
                          </div>
                          <div className="relative w-fit h-fit flex items-center justify-center">
                            {informacion?.[i]?.rentPaid} $AU
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
          onClick={() => setMostrarMas(!mostrarMas)}
        >
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
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

export default Agentes;
