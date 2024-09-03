"use client";
import { ModalContext } from "@/app/providers";
import Cargando from "@/components/common/modules/Cargando";
import { Dictionary } from "@/components/game/types/game.types";
import useCuenta from "@/components/npc/hooks/useCuenta";
import { INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { useAccount } from "wagmi";
import { Profile } from "../../../../graphql/generated";
import { GiWorld } from "react-icons/gi";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import useConversacion from "@/components/npc/hooks/useConversacion";
import manejarBuscarPerfiles from "@/lib/helpers/manejarBuscarPerfiles";
import Feed from "@/components/npc/modules/Feed";
import useAccountPropia from "@/components/game/hooks/useAccount";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";

export default function NPC({
  lang,
  dict,
}: {
  lang: string;
  dict: Dictionary;
}) {
  const contexto = useContext(ModalContext);
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected } = useAccount();
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  });
  const handle = useParams();
  const { cuentaCargando, perfil, npc, dejarNpc, seguirCargando, seguirNpc } =
    useCuenta(
      (handle?.handle as string)?.replace("%40", ""),
      contexto?.lensConectado,
      publicClient,
      contexto?.setIndexar!,
      contexto?.setErrorInteraccion!
    );

  const {
    descripcion,
    caretCoord,
    setCaretCoord,
    setMencionarPerfiles,
    setDescripcion,
    elementoTexto,
    mencionarPerfiles,
    perfilesAbiertos,
    setPerfilesAbiertos,
    hacerPublicacion,
    cargandoConexion,
  } = useConversacion(
    publicClient,
    contexto?.setIndexar!,
    contexto?.setErrorInteraccion!,
    address
  );
  const { manejarLens } = useAccountPropia(
    isConnected,
    contexto?.setEsArtista!,
    contexto?.setLensConectado!,
    openAccountModal,
    contexto?.setMostrarNotificacion!,
    address,
    publicClient,
    dict,
    contexto?.lensConectado,
    contexto?.oraculos!,
    contexto?.setOraculos!
  );

  if (cuentaCargando) {
    return <Cargando />;
  }

  return (
    <div className="relative w-full h-fit min-w-screen flex items-start justify-start min-h-screen bg-black pb-14 flex-col">
      <div className="relative w-full h-full flex items-center lg:items-stretch justify-start flex-col lg:flex-row">
        <div className="relative w-full lg:w-60 h-12 lg:h-auto shrink-0 flex">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmSfZKsL8SySAa2FhSmw6cH9rqwDhnXM58HcqKMxT4E8Mo`}
            layout="fill"
            objectFit="fill"
            draggable={false}
          />
        </div>
        <div className="relative  w-full h-8 lg:h-auto lg:w-32 shrink-0 flex border-y-2 lg:border-x-2 border-white bg-turq text-white text-lg font-clar">
          <div className="relative lg:rotate-90 w-fit h-fit">palabras</div>
        </div>
        <div className="relative w-full h-full items-stretch justify-start flex flex-col gap-6 p-8 grow">
          <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row">
            <div
              className={`text-white font-lib relative w-full h-fit flex items-start justify-start text-[8vw] 1xl:text-[10vw] overflow-x-hidden`}
            >
              {perfil?.handle?.suggestedFormatted?.localName}
            </div>
            <div className="absolute top-3 right-3 w-fit flex-row flex h-fit items-end justify-start gap-2">
              <div className="relative flex w-4 md:w-8 h-4 md:h-8 flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmUfJojpNhnpGhrynj9edpJPBm4johzGvNcyMnAADgqdDC`}
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                />
              </div>
              <div className="relative flex w-4 md:w-8 h-4 md:h-8 flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmWmfupyTZwUAM85VAJBNaXhek8ATnqLGZeZFS5msPHY4c`}
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
            <div className="relative w-full h-fit flex items-center justify-center flex-col">
              <div className={`relative w-full rounded-sm h-32`}>
                {perfil?.metadata?.coverPicture?.raw?.uri && (
                  <Image
                    className="rounded-sm"
                    objectFit="cover"
                    layout="fill"
                    draggable={false}
                    src={
                      !perfil?.metadata?.coverPicture?.raw?.uri?.includes(
                        "ipfs"
                      )
                        ? perfil?.metadata?.coverPicture?.raw?.uri
                        : `${INFURA_GATEWAY}/ipfs/${
                            perfil?.metadata?.coverPicture?.raw?.uri?.split(
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
                    contexto?.lensConectado?.id &&
                    "cursor-pointer active:scale-95"
                  }`}
                  onClick={() =>
                    !seguirCargando &&
                    contexto?.lensConectado?.id &&
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
              </div>
              <div className="relative w-full h-10 flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmZM3fAAnxgCn4a2Uz3L5dARVeGCnQYPpJL3q7hoFL2x7D`}
                  layout="fill"
                  objectFit="cover"
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className="relative w-full h-[30rem] flex flex-row gap-6 items-center justify-between">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/${npc?.tapa_dos}`}
                layout="fill"
                objectFit="contain"
                draggable={false}
              />
            </div>
            <div
              className={`relative w-full h-full bg-turq flex flex-col items-center text-white round-md rounded-sm font-vcr justify-stretch p-1.5 gap-3`}
            >
              <div className="relative w-full h-full p-2 border border-white rounded-sm"></div>
              <textarea
                value={descripcion || ""}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                  manejarBuscarPerfiles(
                    e,
                    setPerfilesAbiertos,
                    setMencionarPerfiles,
                    0,
                    contexto?.lensConectado,
                    setCaretCoord,
                    elementoTexto
                  );
                }}
                ref={elementoTexto as any}
                className="relative rounded-sm p-1 bg-black text-xs border border-white w-full h-40 break-all justify-center items-end flex"
                style={{
                  resize: "none",
                }}
              ></textarea>
              <div
                className={`absolute font-vcr bottom-4 right-4 flex items-center justify-center border border-white rounded-md w-14 text-xxs h-7 ${
                  !cargandoConexion && "cursor-pointer active:scale-95"
                }`}
                onClick={() => hacerPublicacion()}
              >
                {cargandoConexion ? (
                  <div
                    className={`relative w-fit h-fit flex items-center justify-center ${
                      cargandoConexion && "animate-spin"
                    }`}
                  >
                    <AiOutlineLoading size={15} color="white" />
                  </div>
                ) : (
                  dict.Home.send
                )}
              </div>
              {mencionarPerfiles?.length > 0 && perfilesAbiertos && (
                <div
                  className={`absolute w-40 border border-white max-h-full h-fit flex flex-col overflow-y-auto items-start justify-start z-100`}
                  style={{
                    top: caretCoord[0].y + 30,
                    left: caretCoord[0].x,
                  }}
                >
                  {mencionarPerfiles?.map((user: Profile, indexTwo: number) => {
                    const profileImage = createProfilePicture(
                      user?.metadata?.picture
                    );
                    return (
                      <div
                        key={indexTwo}
                        className={`relative border-y border-white w-full h-10 px-3 py-2 bg-black flex flex-row gap-3 cursor-pointer items-center justify-center break-all`}
                        onClick={() => {
                          setPerfilesAbiertos((prev) => {
                            const arr = [...prev];
                            arr[0] = false;
                            return arr;
                          });

                          setDescripcion(
                            (prev) =>
                              prev?.substring(0, prev?.lastIndexOf("@")) +
                              `${user?.handle?.suggestedFormatted?.localName}`
                          );
                        }}
                      >
                        <div className="relative flex flex-row w-full h-full text-white font-aust items-center justify-center gap-2">
                          <div
                            className={`relative rounded-full flex bg-black w-3 h-3 items-center justify-center`}
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
                            {user?.handle?.suggestedFormatted?.localName}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="relative w-1/2 flex items-center justify-center">
            <Feed
              perfil={perfil}
              dict={dict}
              lensConectado={contexto?.lensConectado}
              setAbrirCita={contexto?.setAbrirCita!}
              setMostrarPerfil={contexto?.setMostrarPerfil!}
              setMostrarInteracciones={contexto?.setMostrarInteracciones!}
              setSeguirColeccionar={contexto?.setSeguirColeccionar!}
              setVerImagen={contexto?.setVerImagen!}
              address={address}
              publicClient={publicClient}
              conectado={isConnected}
              setIndexar={contexto?.setIndexar!}
              setErrorInteraccion={contexto?.setErrorInteraccion!}
              manejarLens={manejarLens}
              openConnectModal={openConnectModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
