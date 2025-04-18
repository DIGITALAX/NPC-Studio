import moment from "moment";
import { FunctionComponent, JSX } from "react";
import Petalos from "./Petalos";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";
import { DesafianteInfoProps } from "../types/index.type";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const DesafianteInfo: FunctionComponent<DesafianteInfoProps> = ({
  dict,
  desafiante,
  escenas,
  colorUno,
  colorDos,
  colorTres,
  colorCuatro,
  text,
  setMostrarPerfil,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit sm:h-full justify-between flex flex-col gap-8 items-center overflow-y-scroll">
      <div className="relative w-full h-fit sm:h-full justify-start flex flex-col gap-8 items-center">
        <div className="relative w-full h-fit flex flex-row gap-3 items-center justify-between">
          <div className="relative w-fit h-fit text-white flex items-start justify-start text-2xl">
            {dict.Home.activeSince}
          </div>
          <div
            className={`text-white flex w-fit h-fit items-center justify-center text-lg font-clar text-${text}`}
          >
            {moment(desafiante?.account?.createdAt).fromNow() || "0"}
          </div>
        </div>
        <div className="relative w-full h-fit flex items-center justify-center gap-3 xl:flex-nowrap flex-wrap">
          <Petalos
            puntaje={
              desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + el?.metadata?.collections,
                0
              )!
            }
            total={
              desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + el?.metadata?.global,
                0
              )!
            }
            colorUno={colorUno}
            colorDos={colorDos}
            titulo={dict.Home.globalW}
          />
          <Petalos
            puntaje={
              desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + el?.metadata?.model,
                0
              )!
            }
            total={
              desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + el?.metadata?.global,
                0
              )!
            }
            colorUno={colorTres}
            colorDos={colorCuatro}
            titulo={dict.Home.globalN}
          />
        </div>
        <div
          className={`relative w-full h-fit flex flex-wrap gap-3 items-center justify-between text-xs text-${text}`}
        >
          {[
            {
              titulo: dict?.Home?.colTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.collections),
                0
              ),
            },
            {
              titulo: dict?.Home?.apTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.appearance),
                0
              ),
            },
            {
              titulo: dict?.Home?.chatTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.chatContext),
                0
              ),
            },
            {
              titulo: dict?.Home?.loraTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.lora),
                0
              ),
            },

            {
              titulo: dict?.Home?.modelTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.model),
                0
              ),
            },

            {
              titulo: dict?.Home?.personalityTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.personality),
                0
              ),
            },

            {
              titulo: dict?.Home?.sceneTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.scene),
                0
              ),
            },
            {
              titulo: dict?.Home?.spriteTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.spriteSheet),
                0
              ),
            },
            {
              titulo: dict?.Home?.tokenTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.tokenizer),
                0
              ),
            },
            {
              titulo: dict?.Home?.trainTotal,
              valor: desafiante?.historial?.scores?.reduce(
                (sum, el) => sum + Number(el?.metadata?.training),
                0
              ),
            },
          ].map((el, indice) => {
            return (
              <div
                key={indice}
                className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1"
              >
                <div className="flex w-fit h-fit items-center justify-center text-white">
                  {el.titulo}
                </div>
                <div className="flex w-fit h-fit items-center justify-center font-clar">
                  {el.valor || 0}
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-start">
          <div className="relative w-fit h-fit text-white flex items-start justify-start text-xl">
            {dict.Home.lensStats}
          </div>
          <div
            className={`relative w-full h-fit flex flex-row justify-between items-start gap-3 text-${text} xl:flex-nowrap flex-wrap`}
          >
            <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
              <div className="flex w-fit h-fit items-center justify-center text-2xl">
                {desafiante?.historial?.stats?.graphFollowStats?.followers}
              </div>
              <div className="text-white flex w-fit h-fit items-center justify-center text-lg font-clar">
                {dict.Home.seguidores}
              </div>
            </div>
            <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
              <div className="flex w-fit h-fit items-center justify-center text-2xl">
                {desafiante?.historial?.stats?.graphFollowStats?.following}
              </div>
              <div className="text-white flex w-fit h-fit items-center justify-center text-lg font-clar">
                {dict.Home.siguiendo}
              </div>
            </div>
          </div>
          <div
            className={`relative w-full h-fit flex flex-wrap justify-between items-start gap-3 text-${text}`}
          >
            <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
              <div className="flex w-fit h-fit items-center justify-center text-lg">
                {desafiante?.historial?.stats?.feedStats?.posts || 0}
              </div>
              <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                {dict.Home.Pubs}
              </div>
            </div>
            <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
              <div className="flex w-fit h-fit items-center justify-center text-lg">
                {desafiante?.historial?.stats?.feedStats?.reposts || 0}
              </div>
              <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                {dict.Home.Mirrors}
              </div>
            </div>
            <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
              <div className="flex w-fit h-fit items-center justify-center text-lg">
                {desafiante?.historial?.stats?.feedStats?.comments || 0}
              </div>
              <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                {dict.Home.Comments}
              </div>
            </div>
            <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
              <div className="flex w-fit h-fit items-center justify-center text-lg">
                {desafiante?.historial?.stats?.feedStats?.reactions || 0}
              </div>
              <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
                {dict.Home.Likes}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-start">
          <div className="relative w-fit h-fit text-white flex items-start justify-start text-xl">
            {dict.Home.escenasActivas}
          </div>
          <div className="relative w-fit h-fit flex items-center justify-center text-sm flex-row">
            <div className="relative w-32 h-24 flex items-center justify-center">
              <Image
                objectFit="cover"
                draggable={false}
                layout="fill"
                src={`${INFURA_GATEWAY}/ipfs/${
                  escenas?.find((e) =>
                    e.sprites?.find(
                      (spr) =>
                        spr.account_address?.toLowerCase() ==
                        desafiante?.account_address?.toLowerCase()
                    )
                  )?.imagen
                }`}
              />
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-start text-white">
          <div className="relative w-fit h-fit flex items-start justify-start text-xl">
            {dict.Home.coleccionesActivas}
          </div>
          <div className="relative w-fit h-fit flex items-start justify-start text-sm flex flex-row gap-2">
            <div className="relative w-fit h-fit flex items-start justify-start text-xl">
              {dict.Home.totalColecciones}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start text-xl">
              $
              {desafiante?.collections?.reduce(
                (sum, col) => sum + Number(col?.precio) / 10 ** 18,
                0
              ) || 0}
            </div>
          </div>
        </div>
      </div>
      {Number(desafiante?.collections?.length) > 0 && (
        <div className="relative w-full h-fit flex items-start justify-start text-xs flex-wrap gap-6">
          {desafiante?.collections?.map((col, indice) => {
            return (
              <div
                key={indice}
                className="relative flex w-fit h-fit flex flex-col gap-2"
              >
                <div className="relative w-fit h-fit flex">{col?.titulo}</div>
                <div
                  className="relative w-fit h-fit flex items-center justify-center gap-1 mr-auto cursor-pointer active:scale-95"
                  onClick={() => setMostrarPerfil(col?.profile?.address)}
                >
                  <div className="relative w-fit h-fit flex items-center justify-center">
                    <div className="relative flex items-center justify-center rounded-full w-5 h-5 bg-black border border-white">
                      {col?.profile?.metadata?.picture && (
                        <Image
                          layout="fill"
                          src={handleProfilePicture(col?.profile?.metadata?.picture)}
                          draggable={false}
                          className="rounded-full"
                          objectFit="cover"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`relative w-fit h-fit text-xxs flex items-center justify-center text-white font-bit top-px break-all`}
                  >
                    {col?.profile?.username?.localName
                      ? col?.profile?.username?.localName.length > 25
                        ? col?.profile?.username?.localName.substring(0, 20) +
                          "..."
                        : col?.profile?.username?.localName
                      : ""}
                  </div>
                </div>
                <div className="relative w-fit h-fit flex">
                  <div className="relative w-32 h-24 flex items-center justify-center">
                    <Image
                      objectFit="cover"
                      draggable={false}
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${
                        col?.imagenes?.[0]?.split("ipfs://")?.[1]
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DesafianteInfo;
