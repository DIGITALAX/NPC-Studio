import { FunctionComponent } from "react";
import { CuentaProps, Sprite } from "../types/game.types";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { AiOutlineLoading } from "react-icons/ai";
import { ImageSet, Profile } from "../../../../graphql/generated";
import { GiWorld } from "react-icons/gi";
import descripcionRegex from "@/lib/helpers/descripcionRegex";
import { useRouter } from "next/navigation";

const Cuenta: FunctionComponent<CuentaProps> = ({
  dict,
  npc,
  perfil,
  seguirCargando,
  seguirNpc,
  dejarNpc,
  lensConectado,
  npcCargando,
  manejarMensaje,
  setMostrarPerfil,
}) => {
  const router = useRouter();
  return (
    <div className="relative w-[90%] h-[90%] bg-black/70 flex items-start justify-center px-4 py-6 overflow-y-scroll border border-rosa p-1 rounded-sm">
      <div
        className={`relative w-full h-fit flex items-center justify-start flex-col gap-3 ${
          npcCargando && "animate-pulse"
        }`}
      >
        {npc && (
          <div className="relative flex flex-row gap-3 justify-end sm:flex-nowrap flex-wrap items-center h-fit w-full">
            <div
              className="relative w-fit px-1.5 h-7 font-con rounded-sm text-xxs text-white border border-amarillo bg-black flex items-center justify-center cursor-pointer active:scale-95 hover:opacity-80"
              onClick={() =>
                manejarMensaje!(
                  perfil?.handle?.suggestedFormatted?.localName as string
                )
              }
            >
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict.Home.charla}
              </div>
              {/* <Image
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/QmQjZ1CpMdPgUtNyPJcQUsJfWAaeY1qaHNumGbk2FAmDxH`}
                layout="fill"
                objectFit="cover"
                className="rounded-sm"
                title={dict.Home.charla}
              /> */}
            </div>
            <div
              className="relative w-fit px-1.5 h-7 font-con rounded-sm text-xxs text-white border border-amarillo bg-black flex items-center justify-center cursor-pointer active:scale-95 hover:opacity-80"
              onClick={() => {
                if (setMostrarPerfil) {
                  setMostrarPerfil(undefined);
                }
                router.push(
                  `/npc/${perfil?.handle?.suggestedFormatted?.localName}`
                );
              }}
            >
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict.Home.espectar2}
              </div>
              {/* <Image
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/Qme8K9FmGB5TaB8cSGZHwNgPartHeL4pzeTPqD9hzR3ygc`}
                className="rounded-sm"
                layout="fill"
                objectFit="cover"
                title={dict.Home.espectador}
              /> */}
            </div>
          </div>
        )}
        <div
          className={`relative w-full rounded-sm bg-black border border-amarillo h-32 ${
            npcCargando && "animate-pulse"
          }`}
        >
          {perfil?.metadata?.coverPicture?.raw?.uri && (
            <Image
              className="rounded-sm"
              objectFit="cover"
              layout="fill"
              draggable={false}
              src={
                !perfil?.metadata?.coverPicture?.raw?.uri?.includes("ipfs")
                  ? perfil?.metadata?.coverPicture?.raw?.uri
                  : `${INFURA_GATEWAY}/ipfs/${
                      perfil?.metadata?.coverPicture?.raw?.uri?.split(
                        "ipfs://"
                      )?.[1]
                    }`
              }
            />
          )}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black items-end justify-between flex flex-row gap-4 p-2 sm:flex-nowrap flex-wrap">
            <div
              className={`relative justify-center items-center flex w-24 px-px h-8 font-con rounded-sm text-xxs text-white border border-amarillo bg-black ${
                !seguirCargando &&
                lensConectado?.id &&
                "cursor-pointer active:scale-95"
              }`}
              onClick={() =>
                !seguirCargando &&
                lensConectado?.id &&
                (perfil?.operations?.isFollowedByMe?.value
                  ? dejarNpc()
                  : seguirNpc())
              }
            >
              <div
                className={`relative w-fit h-fit flex items-center justify-center text-center ${
                  seguirCargando && "animate-spin"
                }`}
              >
                {seguirCargando ? (
                  <AiOutlineLoading color="white" size={15} />
                ) : perfil?.operations?.isFollowedByMe?.value ? (
                  dict.Home.dejar
                ) : (
                  dict.Home.seguir
                )}
              </div>
            </div>
            <div
              className={`relative justify-center rounded-full w-14 h-14 items-center border border-amarillo bg-black ${
                npcCargando && "animate-pulse"
              }`}
            >
              {(perfil?.metadata?.picture as ImageSet)?.raw?.uri && (
                <Image
                  draggable={false}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  src={
                    !(
                      perfil?.metadata?.picture as ImageSet
                    )?.raw?.uri?.includes("ipfs")
                      ? (perfil?.metadata?.picture as ImageSet)?.raw?.uri
                      : `${INFURA_GATEWAY}/ipfs/${
                          (
                            perfil?.metadata?.picture as ImageSet
                          )?.raw?.uri?.split("ipfs://")?.[1]
                        }`
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col items-start justify-start gap-1.5">
          <div className="relative w-full h-fit flex flex-row gap-1.5 items-center justify-between sm:flex-nowrap flex-wrap">
            <div className="font-bit text-3xl text-viola break-all flex items-center justify-center">
              {perfil?.metadata?.displayName}
            </div>
            <div className="font-con text-ballena text-sm break-all flex items-center justify-center">
              {perfil?.handle?.suggestedFormatted?.localName}
            </div>
          </div>
          <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row font-con text-xs text-white sm:flex-nowrap flex-wrap">
            <div className="relative w-fit h-fit flex items-center justify-center gap-1 flex-row">
              <div className="relative w-fit h-fit flex items-center justify-center">
                <GiWorld color="white" size={15} />
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center">
                {
                  perfil?.metadata?.attributes?.find(
                    (at) => at.key?.toLowerCase() == "location"
                  )!?.value
                }
              </div>
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center gap-1 flex-row">
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict.Home.seguidores}
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center">
                {perfil?.stats?.followers}
              </div>
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center gap-1 flex-row">
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict.Home.siguiendo}
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center">
                {perfil?.stats?.following}
              </div>
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-1 flex-wrap">
              {npc?.prompt?.idiomas?.map((id: string, indice: number) => {
                return (
                  <div
                    key={indice}
                    className="relative w-fit h-fit flex items-center justify-center"
                  >
                    {id}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit break-all text-xs text-left items-start justify-start font-con text-white">
          {perfil?.metadata?.bio}
        </div>
        {npc && (
          <>
            <div className="relative w-full h-full flex items-start justify-between flex-col sm:flex-row gap-3">
              <div className="relative w-full h-96 flex items-center justify-center">
                <Image
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                  src={`${INFURA_GATEWAY}/ipfs/${npc?.tapa_dos}`}
                />
              </div>
              <div className="relative w-full h-96 overflow-y-scroll flex items-start justify-start text-left gap-2 flex-col">
                <div className="relative text-lg font-bit underline underline-offset-4 text-amarillo flex">
                  {dict.Home.info}
                </div>
                <div
                  className="relative text-sm font-con text-white break-all flex overflow-y-scroll whitespace-preline"
                  dangerouslySetInnerHTML={{
                    __html: descripcionRegex(
                      npc?.prompt?.personalidad || "",
                      true
                    ),
                  }}
                ></div>
              </div>
            </div>
            {npc?.amigos?.length > 0 && (
              <div className="relative w-full h-fit flex items-start justify-start text-left flex-col gap-2 pt-4">
                <div className="relative text-lg font-bit underline underline-offset-4 text-amarillo flex">
                  {dict.Home.amigos}
                </div>
                <div className="relative w-fit h-fit flex items-start justify-between flex-row flex-wrap gap-2">
                  {npc?.amigos?.map(
                    (amigo: Sprite & { handle: string }, indice: number) => {
                      return (
                        <div
                          className="relative w-fit h-fit flex items-center justify-center"
                          key={indice}
                        >
                          <div
                            className="w-32 h-32 cursor-pointer active:scale-95 hover:opacity-70"
                            onClick={() => {
                              if (setMostrarPerfil) {
                                setMostrarPerfil(undefined);
                              }

                              router.push(`/npc/${amigo?.handle}`);
                            }}
                          >
                            <Image
                              layout="fill"
                              objectFit="contain"
                              draggable={false}
                              src={`${INFURA_GATEWAY}/ipfs/${amigo.tapa_dos}`}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cuenta;
