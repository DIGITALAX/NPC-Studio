import { FunctionComponent, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { GiWorld } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import { AnimationContext, ModalContext } from "@/app/providers";
import { CuentaProps } from "../types/modals.types";
import descripcionRegex from "@/app/lib/helpers/descripcionRegex";
import { Sprite } from "../../Common/types/common.types";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const Cuenta: FunctionComponent<CuentaProps> = ({
  dict,
  npcCargando,
  seguirCargando,
  seguirNpc,
  dejarNpc,
  perfil,
}) => {
  const router = useRouter();
  const animContexto = useContext(AnimationContext);
  const contexto = useContext(ModalContext);
  return (
    <div className="relative w-[90%] h-[90%] bg-black/70 flex items-start justify-center px-4 py-6 overflow-y-scroll border border-rosa p-1 rounded-sm">
      <div
        className={`relative w-full h-fit flex items-center justify-start flex-col gap-3 ${
          npcCargando && "animate-pulse"
        }`}
      >
        {perfil?.sprite && (
          <div className="relative flex gap-3 justify-end items-center h-fit w-full">
            <div
              className="relative w-fit px-1.5 h-7 font-con rounded-sm text-xxs text-white border border-amarillo bg-black flex items-center justify-center cursor-pointer active:scale-95 hover:opacity-80"
              onClick={() => {
                if (contexto?.setMostrarPerfil) {
                  contexto?.setMostrarPerfil(undefined);
                }
                animContexto?.setPageChange(false);
                router.push(
                  `/agent/${perfil?.sprite?.account?.username?.localName}`
                );
              }}
            >
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict.Home.espectar2}
              </div>
            </div>
          </div>
        )}
        <div
          className={`relative w-full rounded-sm bg-black border border-amarillo h-32 ${
            npcCargando && "animate-pulse"
          }`}
        >
          {perfil?.account?.metadata?.coverPicture && (
            <Image
              className="rounded-sm"
              objectFit="cover"
              layout="fill"
              draggable={false}
              src={handleProfilePicture(
                perfil?.account?.metadata?.coverPicture
              )}
            />
          )}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black items-end justify-between flex flex-row gap-4 p-2 sm:flex-nowrap flex-wrap rounded-sm">
            <div
              className={`relative justify-center items-center flex w-24 px-px h-8 font-con rounded-sm text-xxs text-white border border-amarillo bg-black ${
                !seguirCargando &&
                contexto?.lensConectado?.profile &&
                "cursor-pointer active:scale-95"
              }`}
              onClick={() =>
                !seguirCargando &&
                contexto?.lensConectado?.profile &&
                (perfil?.account?.operations?.isFollowedByMe
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
                ) : perfil?.account?.operations?.isFollowedByMe ? (
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
              {perfil?.account?.metadata?.picture && (
                <Image
                  draggable={false}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  src={handleProfilePicture(perfil?.account?.metadata?.picture)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col items-start justify-start gap-1.5">
          <div className="relative w-full h-fit flex flex-row gap-1.5 items-center justify-between sm:flex-nowrap flex-wrap">
            <div className="font-bit text-3xl text-viola break-all flex items-center justify-center">
              {perfil?.account?.metadata?.name}
            </div>
            <div className="font-con text-ballena text-sm break-all flex items-center justify-center">
              {perfil?.account?.username?.localName}
            </div>
          </div>
          <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row font-con text-xs text-white sm:flex-nowrap flex-wrap">
            <div className="relative w-fit h-fit flex items-center justify-center gap-1 flex-row">
              <div className="relative w-fit h-fit flex items-center justify-center">
                <GiWorld color="white" size={15} />
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center">
                {
                  perfil?.account?.metadata?.attributes?.find(
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
                {perfil?.stats?.graphFollowStats?.followers}
              </div>
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center gap-1 flex-row">
              <div className="relative w-fit h-fit flex items-center justify-center">
                {dict.Home.siguiendo}
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center">
                {perfil?.stats?.graphFollowStats?.following}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit break-all text-xs text-left items-start justify-start font-con text-white">
          {perfil?.account?.metadata?.bio}
        </div>
        {perfil?.sprite && (
          <>
            <div className="relative w-full h-full flex items-start justify-between flex-col sm:flex-row gap-3">
              <div className="relative w-full h-96 flex items-center justify-center">
                <Image
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                  src={`${INFURA_GATEWAY}/ipfs/${perfil?.sprite?.tapa}`}
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
                      perfil?.sprite?.prompt?.knowledge || "",
                      true
                    ),
                  }}
                ></div>
              </div>
            </div>
            {perfil?.sprite?.amigos?.length > 0 && (
              <div className="relative w-full h-fit flex items-start justify-start text-left flex-col gap-2 pt-4">
                <div className="relative text-lg font-bit underline underline-offset-4 text-amarillo flex">
                  {dict.Home.amigos}
                </div>
                <div className="relative w-fit h-fit flex items-start justify-between flex-row flex-wrap gap-2">
                  {perfil?.sprite?.amigos?.map(
                    (amigo: Sprite, indice: number) => {
                      return (
                        <div
                          className="relative w-fit h-fit flex items-center justify-center"
                          key={indice}
                        >
                          <div
                            className="w-32 h-32 cursor-pointer active:scale-95 hover:opacity-70"
                            onClick={() => {
                              if (contexto?.setMostrarPerfil) {
                                contexto?.setMostrarPerfil(undefined);
                              }
                              animContexto?.setPageChange(false);
                              router.push(
                                `/agent/${amigo?.account?.username?.localName}`
                              );
                            }}
                          >
                            <Image
                              layout="fill"
                              objectFit="contain"
                              draggable={false}
                              src={`${INFURA_GATEWAY}/ipfs/${amigo.tapa}`}
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
