import { FunctionComponent } from "react";
import { PiArrowFatLinesLeft, PiArrowFatLinesRight } from "react-icons/pi";
import { SceneProps } from "../types/game.types";
import { INFURA_GATEWAY, SCENE_LIST } from "../../../../lib/constants";
import Image from "next/legacy/image";

const Scene: FunctionComponent<SceneProps> = ({
  npc,
  setNpc,
  escena,
  t,
  setEscena,
}) => {
  return (
    <div className="relative flex flex-col gap-10 h-fit w-full items-center justify-start border-4 border-cielo rounded-md bg-black/80 p-4">
      <div className="relative w-full h-fit flex items-center justify-start">
        <div className="relative font-at text-4xl text-white items-center justify-center w-fit h-fit flex whitespace-preline text-center leading-5">
          {t.rich("config")}
        </div>
      </div>
      <div className="relative w-full h-fit flex items-center justify-start gap-4 sm:gap-2 flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 h-40 sm:h-36 xl:h-32 flex items-center justify-center flex-col gap-2 bg-black p-2 rounded-md border-2 border-lime">
          <div className="relative w-fit h-fit flex items-center justify-center font-leco text-viola text-base whitespace-nowrap">
            {t.rich("npc")}
          </div>
          <div className="relative w-full h-full flex items-center justify-between flex-row gap-2">
            <div
              className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
              onClick={() =>
                setNpc((prev) =>
                  prev - 1 < 0
                    ? SCENE_LIST?.find((es) => es?.key == escena)!?.sprites
                        ?.length - 1
                    : prev - 1
                )
              }
            >
              <PiArrowFatLinesLeft size={20} color="#2E91D4" />
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                draggable={false}
                layout="fill"
                objectFit="contain"
                src={`${INFURA_GATEWAY}/ipfs/${
                  SCENE_LIST?.find((es) => es?.key == escena)!?.sprites?.[npc]
                    ?.cover
                }`}
              />
            </div>
            <div
              className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
              onClick={() =>
                setNpc((prev) =>
                  prev + 1 >
                  SCENE_LIST?.find((es) => es?.key == escena)!?.sprites
                    ?.length -
                    1
                    ? 0
                    : prev + 1
                )
              }
            >
              <PiArrowFatLinesRight size={20} color="#2E91D4" />
            </div>
          </div>
        </div>
        <div className="relative w-full sm:w-48 h-40 sm:h-36 xl:h-32 flex items-center justify-center flex-col gap-2 bg-black p-2 rounded-md border-2 border-lime">
          <div className="relative w-fit h-fit flex items-center justify-center font-leco text-viola text-base whitespace-nowrap">
            {t.rich("scene")}
          </div>
          <div className="relative w-full h-full flex items-center justify-between flex-row gap-2">
            <div
              className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
              onClick={() =>
                setEscena(() => {
                  const index = SCENE_LIST.findIndex(
                    (prev) => prev.key == escena
                  );

                  return index - 1 < 0
                    ? SCENE_LIST[SCENE_LIST?.length - 1]?.key
                    : SCENE_LIST[index - 1]?.key;
                })
              }
            >
              <PiArrowFatLinesLeft size={20} color="#2E91D4" />
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                draggable={false}
                layout="fill"
                priority
                objectFit="cover"
                src={`${INFURA_GATEWAY}/ipfs/${
                  SCENE_LIST?.find((es) => es?.key == escena)!?.cover
                }`}
              />
            </div>
            <div
              className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
              onClick={() =>
                setEscena(() => {
                  const index = SCENE_LIST.findIndex(
                    (prev) => prev.key == escena
                  );

                  return index + 1 > SCENE_LIST?.length - 1
                    ? SCENE_LIST[0]?.key
                    : SCENE_LIST[index + 1]?.key;
                })
              }
            >
              <PiArrowFatLinesRight size={20} color="#2E91D4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
