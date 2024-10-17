import { FunctionComponent } from "react";
import { HistoriaNPC, HistoriaNPCProps } from "../types/npc.types";
import moment from "moment";
import Image from "next/legacy/image";
import createProfilePicture from "@/lib/helpers/createProfilePicture";

const Historia: FunctionComponent<HistoriaNPCProps> = ({
  historia,
  dict,
  votosCargando,
}): JSX.Element => {
  return (
    <div className="relative w-full flex items-start justify-start h-fit flex-col gap-2 pt-10">
      <div className="text-white text-sm font-lib flex items-center justify-center">
        {dict.Home.historia}
      </div>
      {votosCargando ? (
        <div className="relative w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 })?.map((_, indice: number) => {
            return (
              <div
                className="relative w-full h-40 flex rounded-sm border-2 border-morado p-3 bg-offNegro animate-pulse"
                key={indice}
              ></div>
            );
          })}
        </div>
      ) : historia?.length > 0 ? (
        <div className="relative w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {historia?.map((hist: HistoriaNPC, indice: number) => {
            const pfp = createProfilePicture(
              hist?.spectator?.metadata?.picture
            );
            return (
              <div
                className="relative w-full h-40 flex items-start justify-start rounded-sm border-2 border-morado p-3 bg-offNegro"
                key={indice}
              >
                <div className="bg-oscuro overflow-y-scroll w-full h-full gap-3 items-start justify-start rounded-sm p-1 flex flex-col">
                  <div className="relative w-full h-fit justify-between flex-row gap-1 flex items-center font-lib text-xs text-white">
                    <div className="relative cursor-pointer w-fit h-fit break-all">
                      TX Hash
                    </div>
                    <div
                      className="relative cursor-pointer w-fit h-fit break-all"
                      onClick={() =>
                        window.open(
                          `https://polygonscan.com/tx/${hist?.transactionHash}`
                        )
                      }
                    >
                      {hist?.transactionHash?.substring(0, 15) + "..."}
                    </div>
                  </div>
                  <div className="relative w-full h-fit justify-between flex-row gap-1 flex items-center font-lib text-xs text-white">
                    <div className="relative w-fit h-fit break-all">
                      {moment
                        .unix(Number(hist?.blockTimestamp))
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                    <div className="relative w-fit h-fit break-all">
                      {hist?.blockNumber}
                    </div>
                  </div>
                  <div className="relative w-full h-fit flex items-start justify-start flex-row gap-2">
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      <div className="relative w-6 h-6 rounded-full flex items-center justify-center p-1 bg-black border border-rosa">
                        {pfp && (
                          <Image
                            layout="fill"
                            objectFit="cover"
                            src={pfp}
                            draggable={false}
                            className="rounded-full"
                          />
                        )}
                      </div>
                    </div>
                    <div className="relative w-fit h-fit flex items-center justify-center text-base break-all text-xxs font-clar text-white">
                      {hist?.spectator?.handle?.suggestedFormatted?.localName}
                    </div>
                  </div>
                  {hist?.comment?.trim() !== "" && (
                    <div className="relative w-full h-fit flex flex-col gap-1 items-start justify-start">
                      <div className="relative w-full h-fit flex h-fit items-start justify-start text-xs font-lib text-black">
                        {dict.Home?.comment1}:
                      </div>
                      <div className="relative w-full h-fit flex h-fit max-h-[10rem] overflow-y-scroll items-start justify-start text-xs font-lib text-black/90">
                        {hist?.comment}
                      </div>
                    </div>
                  )}
                  <div className="relative w-full h-fit flex items-center justify-between flex-row gap-2 font-clar text-gris text-xs p-2 bg-offNegro">
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      Global
                    </div>
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      {hist?.global}
                    </div>
                  </div>
                  <div className="pt-4 flex items-center font-clar text-xxs justify-center flex-wrap w-full h-fit gap-4 text-white">
                    {[
                      {
                        titulo: dict.Home.appearance,
                        valor: hist?.appearance,
                        color: "#00CCFF",
                      },
                      {
                        titulo: dict.Home.modelo,
                        valor: hist?.model,
                        color: "#FFAA00",
                      },
                      {
                        titulo: dict.Home.chatContexto,
                        valor: hist?.chatContext,
                        color: "#F6FC8D",
                      },
                      {
                        titulo: dict.Home.personalidad,
                        valor: hist?.personality,
                        color: "#00FF00",
                      },
                      {
                        titulo: dict.Home.spriteSheet,
                        valor: hist?.spriteSheet,
                        color: "#D8D8D8",
                      },
                      {
                        titulo: dict.Home.lora,
                        valor: hist?.lora,
                        color: "#C993FF",
                      },
                      {
                        titulo: dict.Home.completedJobs,
                        valor: hist?.completedJobs,
                        color: "#F6FC8D",
                      },
                      {
                        titulo: dict.Home.training,
                        valor: hist?.training,
                        color: "#FFAA00",
                      },
                      {
                        titulo: dict.Home.scene,
                        valor: hist?.scene,
                        color: "#C993FF",
                      },
                      {
                        titulo: dict.Home.tokenizer,
                        valor: hist?.tokenizer,
                        color: "#DF5B70",
                      },
                    ]?.map(
                      (
                        valor: { titulo: string; valor: string; color: string },
                        indice: number
                      ) => {
                        return (
                          <div
                            key={indice}
                            className="relative w-fit h-fit flex items-center justify-center flex-row gap-3 rounded-full px-3 py-1 border-2 bg-offNegro"
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

export default Historia;
