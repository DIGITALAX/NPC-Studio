import { FunctionComponent, JSX, useState } from "react";
import moment from "moment";
import Image from "next/legacy/image";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";
import { Activity as ActivityType } from "../../Index/types/index.type";
import { ActivityProps } from "../types/agent.types";

const Activity: FunctionComponent<ActivityProps> = ({
  dict,
  activity,
}): JSX.Element => {
  const [historialAbierta, setHistorialAbierta] = useState<boolean[]>([]);

  return (
    <div className="relative w-full flex items-start justify-start h-fit flex-col gap-2 pt-10">
      <div className="text-white text-sm font-lib flex items-center justify-center">
        {dict.Home.historia}
      </div>
      {activity?.length < 1 ? (
        <div className="relative w-full h-fit flex flex-col gap-3">
          {activity?.map((hist: ActivityType, indice: number) => {
            return (
              <div
                className={`"relative w-full flex items-start justify-start rounded-sm border-2 border-morado p-3 bg-offNegro h-fit`}
                key={indice}
              >
                <div className="bg-oscuro w-full h-fit gap-3 items-start justify-start rounded-sm px-1 py-2 flex flex-col">
                  <div
                    className="w-full h-fit gap-3 items-start justify-start flex flex-col cursor-pointer"
                    onClick={() =>
                      setHistorialAbierta((prev) => {
                        const todos = [...prev];
                        todos[indice] = !todos[indice];

                        return todos;
                      })
                    }
                  >
                    <div className="relative w-full h-fit justify-between flex-row gap-1 flex items-center font-lib text-xs text-white">
                      <div className="relative cursor-pointer w-fit h-fit break-all">
                        TX Hash
                      </div>
                      <div
                        className="relative cursor-pointer w-fit h-fit break-all"
                        onClick={() =>
                          window.open(`https://polygonscan.com/tx/${hist?.id}`)
                        }
                      >
                        {hist?.id?.substring(0, 15) + "..."}
                      </div>
                    </div>
                    <div className="relative font-lib text-white text-xs w-fit h-fit break-all">
                      {moment
                        .unix(Number(hist?.blockTimestamp))
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                    <div className="relative w-full h-fit flex items-start justify-start flex-row gap-2">
                      <div
                        className="relative w-fit h-fit flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `https://cypher.digitalax.xyz/autograph/${
                              hist?.spectatorProfile?.username?.localName?.split(
                                "@"
                              )?.[1]
                            }`
                          );
                        }}
                      >
                        <div className="relative w-6 h-6 rounded-full flex items-center justify-center p-1 bg-black border border-rosa">
                          {hist?.spectatorProfile?.metadata?.picture && (
                            <Image
                              layout="fill"
                              objectFit="cover"
                              src={handleProfilePicture(
                                hist?.spectatorProfile?.metadata?.picture
                              )}
                              draggable={false}
                              className="rounded-full"
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className="relative w-fit h-fit flex items-center justify-center text-base break-all text-xxs font-clar text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `https://cypher.digitalax.xyz/autograph/${
                              hist?.spectatorProfile?.username?.localName?.split(
                                "@"
                              )?.[1]
                            }`
                          );
                        }}
                      >
                        {hist?.spectatorProfile?.username?.localName}
                      </div>
                    </div>
                  </div>
                  {historialAbierta?.[indice] && (
                    <>
                      <div className="relative w-full h-fit flex items-center justify-between flex-row gap-2 font-clar text-gris text-xs p-2 bg-offNegro">
                        <div className="relative w-fit h-fit flex items-center justify-center">
                          Global
                        </div>
                        <div className="relative w-fit h-fit flex items-center justify-center">
                          {hist?.spectateMetadata?.global}
                        </div>
                      </div>
                      {hist?.spectateMetadata?.comment?.trim() !== "" && (
                        <div className="relative w-full h-fit flex flex-col gap-1 items-start justify-start pt-6">
                          <div className="relative w-full h-fit flex h-fit items-start justify-start text-xs font-lib text-white">
                            {dict.Home?.comment1}:
                          </div>
                          <div className="relative w-full h-fit flex h-fit max-h-[10rem] overflow-y-scroll items-start justify-start text-xs font-lib text-white/90">
                            {hist?.spectateMetadata?.comment}
                          </div>
                        </div>
                      )}
                      <div className="pt-4 flex items-center font-clar text-xxxs justify-center flex-wrap w-full h-fit gap-4 text-white">
                        {[
                          {
                            titulo: dict.Home.appearance,
                            valor: hist?.spectateMetadata?.appearance,
                            color: "#00CCFF",
                          },
                          {
                            titulo: dict.Home.modelo,
                            valor: hist?.spectateMetadata?.model,
                            color: "#FFAA00",
                          },
                          {
                            titulo: dict.Home.chatContexto,
                            valor: hist?.spectateMetadata?.chatContext,
                            color: "#F6FC8D",
                          },
                          {
                            titulo: dict.Home.personalidad,
                            valor: hist?.spectateMetadata?.personality,
                            color: "#00FF00",
                          },
                          {
                            titulo: dict.Home.spriteSheet,
                            valor: hist?.spectateMetadata?.spriteSheet,
                            color: "#D8D8D8",
                          },
                          {
                            titulo: dict.Home.lora,
                            valor: hist?.spectateMetadata?.lora,
                            color: "#C993FF",
                          },
                          {
                            titulo: dict.Home.collections,
                            valor: hist?.spectateMetadata?.collections,
                            color: "#F6FC8D",
                          },
                          {
                            titulo: dict.Home.training,
                            valor: hist?.spectateMetadata?.training,
                            color: "#FFAA00",
                          },
                          {
                            titulo: dict.Home.scene,
                            valor: hist?.spectateMetadata?.scene,
                            color: "#C993FF",
                          },
                          {
                            titulo: dict.Home.tokenizer,
                            valor: hist?.spectateMetadata?.tokenizer,
                            color: "#DF5B70",
                          },
                        ]?.map(
                          (
                            valor: {
                              titulo: string;
                              valor: string;
                              color: string;
                            },
                            indice: number
                          ) => {
                            return (
                              <div
                                key={indice}
                                className="relative w-fit h-8 flex items-center justify-center flex-row gap-3 rounded-sm px-3 py-1 border bg-offNegro"
                                style={{
                                  borderColor: valor?.color,
                                }}
                              >
                                <div className="relative items-center justify-center flex w-fit h-fit">
                                  {valor?.titulo}
                                </div>
                                <div className="relative items-center justify-center flex w-fit h-fit">
                                  {valor?.valor}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative font-lib text-xxs text-costa w-fit h-fit flex items-center text-left">
          {dict.Home.noHistoria}
        </div>
      )}
    </div>
  );
};

export default Activity;
