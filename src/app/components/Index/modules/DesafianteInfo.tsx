import moment from "moment";
import { FunctionComponent, JSX } from "react";
import Petalos from "./Petalos";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
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
    <div className="relative w-full h-fit sm:h-full justify-start flex flex-col gap-8 items-center overflow-y-scroll text-costa">
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
            desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.collections),
              0
            )!
          }
          total={
            desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.global),
              0
            )!
          }
          colorUno={colorUno}
          colorDos={colorDos}
          titulo={dict.Home.globalW}
        />
        <Petalos
          puntaje={
            desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.model),
              0
            )!
          }
          total={
            desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.global),
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
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.collections),
              0
            ),
          },
          {
            titulo: dict?.Home?.apTotal,
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.appearance),
              0
            ),
          },
          {
            titulo: dict?.Home?.chatTotal,
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.chatContext),
              0
            ),
          },
          {
            titulo: dict?.Home?.loraTotal,
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.lora),
              0
            ),
          },

          {
            titulo: dict?.Home?.modelTotal,
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.model),
              0
            ),
          },

          {
            titulo: dict?.Home?.personalityTotal,
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.personality),
              0
            ),
          },

          {
            titulo: dict?.Home?.sceneTotal,
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.scene),
              0
            ),
          },
          {
            titulo: dict?.Home?.spriteTotal,
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.spriteSheet),
              0
            ),
          },
          {
            titulo: dict?.Home?.tokenTotal,
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.tokenizer),
              0
            ),
          },
          {
            titulo: dict?.Home?.trainTotal,
            valor: desafiante?.score?.activity?.reduce(
              (sum, el) => sum + Number(el?.spectateMetadata?.training),
              0
            ),
          },
        ].map((el, indice) => {
          return (
            <div
              key={indice}
              className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1 text-white"
            >
              <div className="flex w-fit h-fit items-center justify-center">
                {el.titulo}
              </div>
              <div className="flex w-fit h-fit items-center justify-center font-clar">
                {el.valor ?? 0}
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
              {desafiante?.stats?.graphFollowStats?.followers}
            </div>
            <div className="text-white flex w-fit h-fit items-center justify-center text-lg font-clar">
              {dict.Home.seguidores}
            </div>
          </div>
          <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
            <div className="flex w-fit h-fit items-center justify-center text-2xl">
              {desafiante?.stats?.graphFollowStats?.following}
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
              {desafiante?.stats?.feedStats?.posts || 0}
            </div>
            <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
              {dict.Home.Pubs}
            </div>
          </div>
          <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
            <div className="flex w-fit h-fit items-center justify-center text-lg">
              {desafiante?.stats?.feedStats?.reposts || 0}
            </div>
            <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
              {dict.Home.Mirrors}
            </div>
          </div>
          <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
            <div className="flex w-fit h-fit items-center justify-center text-lg">
              {desafiante?.stats?.feedStats?.comments || 0}
            </div>
            <div className="text-white flex w-fit h-fit items-center justify-center text-xs font-clar">
              {dict.Home.Comments}
            </div>
          </div>
          <div className="relative w-fit h-fit flex flex-col items-start justify-start text-left gap-1">
            <div className="flex w-fit h-fit items-center justify-center text-lg">
              {desafiante?.stats?.feedStats?.reactions || 0}
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
              src={`${INFURA_GATEWAY_INTERNAL}${
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
          <div className="relative w-fit h-fit flex items-start justify-start text-xl text-costa">
            $
            {desafiante?.collections?.reduce(
              (sum, col) => sum + Number(col?.precio) / 10 ** 18,
              0
            ) || 0}
          </div>
        </div>
        {Number(desafiante?.collections?.length) > 0 && (
          <div className="relative w-full h-full overflow-y-scroll flex items-start justify-start text-xs flex-wrap gap-6">
            {desafiante?.collections?.map((col, indice) => {
              return (
                <div
                  key={indice}
                  className="relative flex w-fit h-fit flex-col gap-2"
                >
                  <div className="relative w-fit h-fit flex text-brillo">
                    {col?.titulo}
                  </div>
                  <div
                    className="relative w-fit h-fit flex items-center justify-center gap-1 mr-auto cursor-pointer active:scale-95"
                    onClick={() => setMostrarPerfil(col?.profile?.address)}
                  >
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      <div className="relative flex items-center justify-center rounded-full w-5 h-5 bg-black border border-white">
                        {col?.profile?.metadata?.picture && (
                          <Image
                            layout="fill"
                            src={handleProfilePicture(
                              col?.profile?.metadata?.picture
                            )}
                            draggable={false}
                            className="rounded-full"
                            objectFit="cover"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className={`relative w-fit h-fit text-xxs flex items-center justify-center font-bit top-px break-all text-white`}
                    >
                      {col?.profile?.username?.localName
                        ? col?.profile?.username?.localName.length > 14
                          ? col?.profile?.username?.localName.substring(0, 12) +
                            "..."
                          : col?.profile?.username?.localName
                        : ""}
                    </div>
                  </div>
                  <div className="relative w-fit h-fit flex">
                    <div className="relative w-32 h-24 flex items-center justify-center bg-brillo border border-white">
                      <Image
                        objectFit="cover"
                        draggable={false}
                        layout="fill"
                        src={`${INFURA_GATEWAY_INTERNAL}${
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
    </div>
  );
};

export default DesafianteInfo;
