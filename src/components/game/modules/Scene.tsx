import { FunctionComponent } from "react";
import { Escena, SceneProps, Sprite } from "../types/game.types";
import { INFURA_GATEWAY } from "../../../lib/constants";
import Image from "next/legacy/image";
import Cuenta from "./Cuenta";
import useCuenta from "../hooks/useCuenta";

const Scene: FunctionComponent<SceneProps> = ({
  npc,
  setNpc,
  escena,
  dict,
  setEscena,
  lensConectado,
  escenas,
  publicClient,
  setErrorInteraccion,
  setIndexar,
  manejarMensaje,
}) => {
  const { perfil, npcCargando, seguirCargando, seguirNpc, dejarNpc, esNPC } =
    useCuenta(
      escenas.flatMap((es) => es.sprites).find((n) => n.etiqueta == npc)!,
      lensConectado,
      publicClient,
      setIndexar,
      setErrorInteraccion,
      escenas
    );

  return (
    <div className="relative flex flex-col gap-10 h-fit xl:h-[36rem] w-full items-start justify-start bg-cover bg-esterilla p-3 rounded-sm">
      <div className="relative w-full h-full flex items-start justify-start bg-black/80 border border-4 border-amarillo rounded-sm flex-col xl:flex-row  overflow-x-hidden">
        <div className="relative w-full xl:w-fit h-[45rem] xl:h-full flex items-center justify-center xl:order-1 order-2">
          <div className="relative w-full xl:w-[35rem] h-full flex items-center justify-center round-sm">
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmSaYHPU7FHybxWyXVSBva64qMYyPZN5vW8igAZ2GeeL2U`}
              objectFit="cover"
              layout="fill"
              objectPosition={"top"}
              draggable={false}
              className="rounded-sm"
            />
            {npc && escenas?.length > 0 && (
              <Cuenta
                dict={dict}
                manejarMensaje={manejarMensaje}
                npc={esNPC}
                perfil={perfil!}
                seguirCargando={seguirCargando}
                seguirNpc={seguirNpc}
                dejarNpc={dejarNpc}
                npcCargando={npcCargando}
                lensConectado={lensConectado}
              />
            )}
          </div>
        </div>
        <div className="relative w-full h-fit p-4 items-start justify-between flex flex-col gap-10 xl:order-2 order-1">
          <div className="relative w-full h-fit flex items-start justify-start overflow-x-auto">
            <div className="relative scroll-container h-fit flex items-start justify-start gap-4">
              {escenas
                ?.find((es) => es?.clave == escena)!
                ?.sprites.map((sprite: Sprite, index: number) => {
                  return (
                    <div
                      key={index}
                      className="relative w-fit h-fit flex items-center justify-center cursor-pointer bg-amarillo rounded-sm"
                      onClick={() => setNpc(sprite.etiqueta)}
                    >
                      <div
                        className={`relative w-44 h-60 flex items-center justify-center ${
                          npc === sprite.etiqueta &&
                          "border border-amarillo opacity-70"
                        }`}
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/QmeEg8JFR14AQAyLheisTbYy1Diidak3FaFhEaryZh8s1o`}
                            layout="fill"
                            draggable={false}
                          />
                        </div>
                        <div className="absolute top-1.5 left-2 w-[91%] h-[87%] flex items-center justify-center">
                          <Image
                            layout="fill"
                            draggable={false}
                            src={`${INFURA_GATEWAY}/ipfs/${sprite.tapa}`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="relative w-full h-fit flex items-start justify-start gap-5 flex-col sm:flex-row bottom-0">
            <div className="relative w-fit h-fit flex items-center justify-center">
              <div className="relative w-36 h-fit flex items-center justify-center font-abad text-2xl flex-col gap-2">
                <div className="relative w-fit h-fit flex items-center justify-center text-[#E9C5BC]">
                  {dict.Home.select}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center text-[#FC6D0E]">
                  {`< ${dict.Home.player} >`}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center text-[#FFDE0E]">
                  {`< ${dict.Home.scene} >`}
                </div>
              </div>
            </div>
            <div className="relative w-full h-fit flex items-start justify-start overflow-x-auto">
              <div className="relative scroll-container h-fit flex items-start justify-start gap-4">
                {escenas.map((cuarto: Escena, index: number) => {
                  return (
                    <div
                      key={index}
                      className="relative w-fit h-fit flex items-center justify-center cursor-pointer bg-amarillo rounded-sm"
                      onClick={() => setEscena(cuarto.clave)}
                    >
                      <div
                        className={`relative w-44 h-40 flex items-center justify-center  ${
                          escena === cuarto.clave &&
                          "border border-amarillo opacity-70"
                        }`}
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/QmPVdB75z3KbPdK1X5xkLwrTHZSCzXQnudjWqeHorv7NHZ`}
                            layout="fill"
                            draggable={false}
                          />
                        </div>
                        <div className="absolute top-4 w-3/4 h-2/3 flex items-center justify-center rounded-sm">
                          <Image
                            layout="fill"
                            className="rounded-sm"
                            draggable={false}
                            src={`${INFURA_GATEWAY}/ipfs/${cuarto.imagen}`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
