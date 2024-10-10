"use client";
import { ModalContext } from "@/app/providers";
import Cargando from "@/components/common/modules/Cargando";
import { Dictionary } from "@/components/game/types/game.types";
import useCuenta from "@/components/npc/hooks/useCuenta";
import { INFURA_GATEWAY } from "@/lib/constants";
import Image from "next/legacy/image";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { useAccount } from "wagmi";
import { GiWorld } from "react-icons/gi";
import useConversacion from "@/components/npc/hooks/useConversacion";
import Feed from "@/components/npc/modules/Feed";
import useAccountPropia from "@/components/game/hooks/useAccount";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import Ticker from "@/components/common/modules/Ticker";
import { VerticalTicker, HorizontalTicker } from "react-infinite-ticker";
import Evaluacion from "@/components/npc/modules/Evaluacion";
import Historia from "@/components/npc/modules/Historia";

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
  const router = useRouter();
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
      contexto?.setErrorInteraccion!,
      contexto?.setEscenas!,
      contexto?.escenas!
    );

  const {
    pantalla,
    atributos,
    informacion,
    manejarVotar,
    npcVotar,
    setNPCVotar,
    votarCargando,
    historia
  } = useConversacion(
    publicClient,
    contexto?.setIndexar!,
    contexto?.setErrorInteraccion!,
    address,
    contexto?.lensConectado,
    perfil?.id
  );
  const { manejarLens } = useAccountPropia(
    isConnected,
    contexto?.setEsArtista!,
    contexto?.setLensConectado!,
    contexto?.setMostrarNotificacion!,
    address,
    publicClient,
    contexto?.lensConectado,
    contexto?.setOraculos!,
    openAccountModal
  );

  if (cuentaCargando) {
    return <Cargando continua />;
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
        <div className="relative w-full h-8 lg:h-auto lg:w-20 flex overflow-hidden border-2 border-white bg-turq text-white text-sm font-clar shrink-0">
  <div className="absolute w-full h-full top-0 left-0 flex">
            {pantalla ? (
              <VerticalTicker duration={40000}>
                <Ticker atributos={atributos} />
              </VerticalTicker>
            ) : (
              <HorizontalTicker duration={40000}>
                <Ticker atributos={atributos} />
              </HorizontalTicker>
            )}
          </div>
        </div>
        <div className="relative w-full h-full items-stretch justify-start flex flex-col gap-6 p-3 sm:p-8 grow">
          <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row">
            <div
              className={`text-white font-lib relative w-full h-fit flex items-start justify-start overflow-x-hidden break-all ${
                Number(perfil?.handle?.suggestedFormatted?.localName?.length) >
                8
                  ? "text-[4vw] 1xl:text-[7vw]"
                  : "text-[8vw] 1xl:text-[10vw]"
              }`}
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
          <div className="relative w-full h-fit sm:h-[30rem] flex flex-col sm:flex-row gap-6 items-center justify-center sm:justify-between">
            <div className="relative w-full h-[30rem] sm:h-full flex items-center justify-center">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/${npc?.tapa_dos}`}
                layout="fill"
                objectFit="contain"
                draggable={false}
              />
            </div>
            <div className="realtive w-full h-fit sm:h-full bg-black/80 p-2 flex flex-col items-center justify-between gap-2 text-xxs font-super text-sol">
              <div className="relative w-full h-px flex items-start justify-start bg-azulito"></div>
              <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.auEarned}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {informacion?.auEarned} $AU
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#FF4EFF]"></div>
              <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.activeJobs}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {informacion?.activeJobs}
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#F6FC8D]"></div>
              <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.currentScore}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {informacion?.currentScore}
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#65B0FF]"></div>
              <div className="relative w-full h-fit flex items-center justify-between flex-row gap-1.5">
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.rentPaid}
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {informacion?.rentPaid} $AU
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#09FF6B]"></div>
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
                    Llama3.1 8b
                  </div>
                </div>
                <div className="relative w-14 h-8 flex items-center justify-center">
                  <Image
                    objectFit="contain"
                    draggable={false}
                    layout="fill"
                    src={`${INFURA_GATEWAY}/ipfs/Qmc7CEnyHBDPXqxFkoVpxf9DHxjGee2z9ToAUitRpkscuP`}
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
                      contexto?.escenas?.find((e) =>
                        e.sprites?.find(
                          (spr) => spr.perfil_id == npc?.perfil_id
                        )
                      )?.clave
                    }
                  </div>
                </div>
                <div className="relative w-14 h-8 flex items-center justify-center">
                  <Image
                    objectFit="cover"
                    draggable={false}
                    layout="fill"
                    src={`${INFURA_GATEWAY}/ipfs/${
                      contexto?.escenas?.find((e) =>
                        e.sprites?.find(
                          (spr) => spr.perfil_id == npc?.perfil_id
                        )
                      )?.imagen
                    }`}
                  />
                </div>
              </div>
              <div className="relative w-full h-px flex items-start justify-start bg-[#FF4EFF]"></div>
            </div>
          </div>
          <div className="relative w-full h-fit flex items-center justify-center flex-col gap-6">
            <div className="relative sm:w-2/3 lg:w-1/2 w-full flex items-center justify-center h-auto">
              <Feed
                perfil={perfil}
                router={router}
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
                escondido
              />
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
                  $MONA, Genesis, PODE, DIGITALAX NFTs
                </div>
              </div>
              <Evaluacion
                dict={dict}
                votarCargando={votarCargando}
                manejarVotar={manejarVotar}
                npcVotar={npcVotar}
                setNPCVotar={setNPCVotar}
              />
            </div>
          </div>
          <Historia dict={dict} historia={historia} />
        </div>
      </div>
    </div>
  );
}
