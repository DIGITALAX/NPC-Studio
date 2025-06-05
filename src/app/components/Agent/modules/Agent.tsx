"use client";
import { ModalContext } from "@/app/providers";
import Image from "next/legacy/image";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { GiWorld } from "react-icons/gi";
import Cargando from "./Cargando";
import { INFURA_GATEWAY, INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import Ticker from "../../Index/modules/Ticker";
import useCuenta from "../../Modals/hooks/useCuenta";
import useAgent from "../hooks/useAgent";
import moment from "moment";
import Feed from "./Feed";
import Evaluacion from "./Evaluacion";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";
import Activity from "./Activity";

export default function Agent({ dict }: { dict: any }) {
  const contexto = useContext(ModalContext);
  const router = useRouter();
  const handle = useParams();
  const { perfil, seguirCargando, seguirNpc, dejarNpc, npcCargando } =
    useCuenta(dict, undefined, (handle?.handle as string)?.replace("%40", ""));
  const { informacion, infoCargando } = useAgent(perfil?.account?.owner);

  if (npcCargando || infoCargando || !perfil || !informacion) {
    return <Cargando />;
  }

  return (
    <div className="relative w-full h-fit min-w-screen flex items-start justify-start min-h-screen bg-black pb-14 flex-col">
      <div className="relative w-full h-full flex items-center lg:items-stretch justify-start flex-col lg:flex-row">
        <div className="relative w-full lg:w-60 h-12 lg:h-auto shrink-0 flex">
          <Image
            src={`${INFURA_GATEWAY_INTERNAL}QmSfZKsL8SySAa2FhSmw6cH9rqwDhnXM58HcqKMxT4E8Mo`}
            layout="fill"
            objectFit="fill"
            draggable={false}
          />
        </div>
        <div className="relative w-full h-8 lg:h-auto lg:w-20 flex overflow-hidden border-2 border-white bg-turq text-white text-sm font-clar shrink-0">
          <Ticker
            agentCollections={[
              {
                ...perfil?.sprite!,
                collections: informacion?.colecciones,
              },
            ]}
          />
        </div>
        <div className="relative w-full h-full items-stretch justify-start flex flex-col gap-6 p-3 sm:p-8 grow">
          <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row">
            <div
              className={`text-white font-lib relative w-full h-fit flex items-start justify-start overflow-x-hidden break-all ${
                Number(perfil?.account?.username?.localName?.length) > 8
                  ? "text-[4vw] 1xl:text-[5.5vw]"
                  : "text-[8vw] 1xl:text-[10vw]"
              }`}
            >
              {perfil?.account?.username?.localName}
            </div>
            <div className="absolute top-3 right-3 w-fit flex-row flex h-fit items-end justify-start gap-2">
              <div className="relative flex w-4 md:w-8 h-4 md:h-8 flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY_INTERNAL}QmUfJojpNhnpGhrynj9edpJPBm4johzGvNcyMnAADgqdDC`}
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                />
              </div>
              <div className="relative flex w-4 md:w-8 h-4 md:h-8 flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY_INTERNAL}QmWmfupyTZwUAM85VAJBNaXhek8ATnqLGZeZFS5msPHY4c`}
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className="relative w-full h-fit flex flex-col gap-5 items-center justify-center font-con text-xs text-white">
            <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row sm:flex-nowrap flex-wrap">
              <div className="relative w-fit h-fit flex items-center justify-center gap-1 flex-row">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  <GiWorld color="white" size={15} />
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {
                    perfil?.account?.metadata?.attributes?.find(
                      (at: { key: string }) =>
                        at.key?.toLowerCase() == "location"
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
            <div className="relative w-full h-fit flex items-center justify-center flex-col">
              <div className={`relative w-full rounded-sm h-32`}>
                {perfil?.account?.metadata?.coverPicture?.raw?.uri && (
                  <Image
                    className="rounded-sm"
                    objectFit="cover"
                    layout="fill"
                    draggable={false}
                    src={
                      !perfil?.account?.metadata?.coverPicture?.raw?.uri?.includes(
                        "ipfs"
                      )
                        ? perfil?.account?.metadata?.coverPicture?.raw?.uri
                        : `${INFURA_GATEWAY}/ipfs/${
                            perfil?.account?.metadata?.coverPicture?.raw?.uri?.split(
                              "ipfs://"
                            )?.[1]
                          }`
                    }
                  />
                )}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black"></div>
                <div
                  className={`absolute bottom-2 right-2 justify-center items-center flex w-24 px-px h-8 font-con rounded-sm text-xxs text-white border border-amarillo bg-black ${
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
              </div>
              <div className="relative w-full h-10 flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY_INTERNAL}QmZM3fAAnxgCn4a2Uz3L5dARVeGCnQYPpJL3q7hoFL2x7D`}
                  layout="fill"
                  objectFit="cover"
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className="relative w-full h-fit sm:h-[30rem] flex flex-col sm:flex-row gap-6 items-center justify-center sm:justify-between">
            <div className="relative w-full h-[30rem] sm:h-full flex items-center justify-center">
              <Image
                src={`${INFURA_GATEWAY_INTERNAL}${perfil?.sprite?.tapa}`}
                layout="fill"
                objectFit="contain"
                draggable={false}
              />
            </div>
            <div className="relative w-full h-fit sm:h-full bg-black/80 p-2 flex flex-col items-center justify-between gap-2 text-xxs font-super text-sol">
              <div className="relative w-full h-px flex items-start justify-start bg-azulito"></div>
              <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.auEarned}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {(Number(informacion?.auTotal) || 0)?.toFixed(2)} $AU
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#F6FC8D]"></div>
              <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.currentScore}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {(informacion?.activity || [])?.reduce(
                    (sum, el) => sum + Number(el?.spectateMetadata?.global),
                    0
                  ) || 0}
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#F6FC8D]"></div>
              <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.currentEarnedAU}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {informacion?.au || 0}
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#09FF6B]"></div>
              <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.activeSince}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {moment(perfil?.account?.createdAt)?.fromNow() || 0}
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#FF4EFF]"></div>
            </div>
          </div>
          <div className="relative w-full h-fit flex items-stretch justify-between flex-col gap-6">
            <div className="relative w-full h-fit flex flex-col gap-2">
              <div className="relative w-full h-fit flex flex-row justify-between items-center">
                <div className="relative w-fit h-fit flex flex-col gap-1 font-lib text-white text-base">
                  <div className="relative w-fit h-fit flex items-center justify-center">
                    {dict.Home.modelo}
                  </div>
                  <div className="relative w-fit h-fit flex items-center justify-center text-sm">
                    gpt-4o-mini
                  </div>
                </div>
                <div className="relative w-14 h-8 flex items-center justify-center">
                  <Image
                    objectFit="contain"
                    draggable={false}
                    layout="fill"
                    src={`${INFURA_GATEWAY_INTERNAL}Qmc7CEnyHBDPXqxFkoVpxf9DHxjGee2z9ToAUitRpkscuP`}
                  />
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#65B0FF]"></div>
            </div>
            <div className="relative w-full h-fit flex flex-col gap-2">
              <div className="relative w-full h-fit flex flex-row justify-between items-center">
                <div className="relative w-fit h-fit flex flex-col gap-1 font-lib text-white text-base">
                  <div className="relative w-fit h-fit flex items-center justify-center">
                    {dict.Home.escenasActivas}
                  </div>
                  <div className="relative w-fit h-fit flex items-center justify-center text-sm">
                    {
                      dict.Home[
                        contexto?.escenas?.find((e) =>
                          e.sprites?.find(
                            (spr) => spr.billetera == perfil?.sprite?.billetera
                          )
                        )?.clave as keyof typeof dict.Home
                      ]
                    }
                  </div>
                </div>
                <div className="relative w-14 h-8 flex items-center justify-center">
                  <Image
                    objectFit="cover"
                    draggable={false}
                    layout="fill"
                    src={`${INFURA_GATEWAY_INTERNAL}${
                      contexto?.escenas?.find((e) =>
                        e.sprites?.find(
                          (spr) => spr.billetera == perfil?.sprite?.billetera
                        )
                      )?.imagen
                    }`}
                  />
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#FF4EFF]"></div>
            </div>
          </div>
          <div className="relative w-full flex items-start justify-center h-fit flex-col gap-2 pt-10">
            <div className="text-white text-2xl font-lib flex items-center justify-center">
              {dict.Home.eval2}
            </div>
            <div className="relative w-full h-fit flex flex-col justify-between items-center gap-6">
              <div className="relative w-full h-fit flex items-start justify-center flex-col">
                <div className="relative w-fit h-fit flex items-center justify-center text-xs font-lib text-[#F6FC8D]">
                  {dict.Home.hold}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center text-xxs font-lib  text-limon">
                  $MONA, $DLTA, Genesis, PODE, DIGITALAX NFTs
                </div>
              </div>
              <Evaluacion dict={dict} agente={perfil?.sprite?.billetera!} />
            </div>
          </div>
          <div className="text-white font-lib relative w-full flex items-start justify-center h-fit flex-col gap-2 pt-10">
            <div className="text-2xl flex items-center justify-center">
              {dict.Home.coleccionesActivas}
            </div>
            <div className="relative w-fit h-fit flex items-start justify-start text-sm flex flex-row gap-2">
              <div className="relative w-fit h-fit flex items-start justify-start text-xl">
                {dict.Home.totalColecciones}
              </div>
              <div className="relative w-fit h-fit flex items-start justify-start text-xl">
                $
                {informacion?.colecciones?.reduce(
                  (sum, col) => sum + Number(col?.precio) / 10 ** 18,
                  0
                ) || 0}
              </div>
            </div>
            {Number(informacion?.colecciones?.length) > 0 && (
              <div className="relative w-full h-fit flex items-start justify-start text-xs flex-wrap gap-6">
                {informacion?.colecciones?.map((col, indice) => {
                  return (
                    <div
                      key={indice}
                      className="relative flex w-fit h-fit flex flex-col gap-2"
                    >
                      <div className="relative w-fit h-fit flex">
                        {(col as any)?.title}
                      </div>
                      <div
                        className="relative w-fit h-fit flex items-center justify-center gap-1 mr-auto cursor-pointer active:scale-95"
                        onClick={() =>
                          contexto?.setMostrarPerfil(col?.profile?.address)
                        }
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
                          className={`relative w-fit h-fit text-xxs flex items-center justify-center text-white font-bit top-px break-all`}
                        >
                          {col?.profile?.username?.localName
                            ? col?.profile?.username?.localName.length > 14
                              ? col?.profile?.username?.localName.substring(
                                  0,
                                  12
                                ) + "..."
                              : col?.profile?.username?.localName
                            : ""}
                        </div>
                      </div>
                      <div className="relative w-fit h-fit flex">
                        <div className="relative bg-brillo w-32 h-24 border border-white flex items-center justify-center">
                          <Image
                            objectFit="cover"
                            draggable={false}
                            layout="fill"
                            src={`${INFURA_GATEWAY_INTERNAL}${
                              (col as any)?.images?.[0]?.split("ipfs://")?.[1]
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
          <div className="relative w-full h-fit flex items-center justify-center flex-col gap-6 pt-10">
            <div className="relative sm:w-2/3 lg:w-1/2 w-full flex items-center justify-center h-auto">
              <Feed
                perfil={perfil?.account?.address}
                router={router}
                dict={dict}
              />
            </div>
          </div>
          <Activity dict={dict} activity={informacion?.activity || []} />
        </div>
      </div>
    </div>
  );
}
