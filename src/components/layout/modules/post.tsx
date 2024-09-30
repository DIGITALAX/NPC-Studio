"use client";
import { ModalContext } from "@/app/providers";
import Cargando from "@/components/common/modules/Cargando";
import { Dictionary } from "@/components/game/types/game.types";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { useAccount } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import usePub from "@/components/post/hooks/usePub";
import Publicacion from "@/components/common/modules/Publicacion";
import useInteracciones from "@/components/common/hooks/useInteracciones";
import useDialog from "@/components/game/hooks/useDialog";
import useAccountPropia from "@/components/game/hooks/useAccount";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";

export default function Post({
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
  const id = useParams();
  const { pubCargando, npc, pub, setPub, escena } = usePub(
    id?.id as string,
    contexto?.lensConectado,
    publicClient,
    contexto?.setIndexar!,
    contexto?.setErrorInteraccion!
  );
  const { manejarLens, setOpcionAbierta } = useAccountPropia(
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
  const {
    comentariosAbiertos,
    setComentariosAbiertos,
    abrirMirrorEleccion,
    setAbrirMirrorEleccion,
    cargandoInteracciones,
    manejarMeGusta,
    manejarMirror,
    manejarColeccionar,
  } = useInteracciones(
    contexto?.lensConectado,
    contexto?.setErrorInteraccion!,
    pub,
    setPub,
    address,
    publicClient,
    contexto?.setIndexar!,
    contexto?.setCarrito!,
    contexto?.setMostrarNotificacion!,
    isConnected,
    openConnectModal,
    manejarLens
  );
  const {
    contenedorMensajesRef,
    setPerfilesAbiertos,
    setMencionarPerfiles,
    setCaretCoord,
    perfilesAbiertos,
    caretCoord,
    mencionarPerfiles,
    publicacionCargando,
    manejarPublicar,
    manejarArchivo,
  } = useDialog(
    address,
    publicClient,
    contexto?.setIndexar!,
    contexto?.setErrorInteraccion!,
    escena,
    contexto?.comentarPublicar!,
    contexto?.setComentarPublicar!,
    isConnected,
    openConnectModal,
    manejarLens,
    contexto?.lensConectado
  );

  if (pubCargando || !pub) {
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
        <div className="relative w-full h-full items-stretch justify-start flex flex-col gap-6 p-8 grow">
          <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row">
            <div
              className={`text-white font-lib relative w-full h-fit flex items-start justify-start text-[8vw] 1xl:text-[10vw] overflow-x-hidden`}
            >
              {dict.Home.espectador}
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
          <div className="relative w-full h-10 flex items-center justify-center">
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmZM3fAAnxgCn4a2Uz3L5dARVeGCnQYPpJL3q7hoFL2x7D`}
              layout="fill"
              objectFit="cover"
              draggable={false}
            />
          </div>
          <div className="relative w-1/2 h-fit flex items-center justify-center">
            <Publicacion
              menos
              router={router}
              setMostrarPerfil={contexto?.setMostrarPerfil!}
              setMostrarInteracciones={contexto?.setMostrarInteracciones!}
              setOpcionAbierta={setOpcionAbierta}
              key={0}
              setCaretCoord={setCaretCoord}
              caretCoord={caretCoord}
              indice={1}
              dict={dict}
              publicacion={pub?.[0]}
              comentariosAbiertos={comentariosAbiertos}
              setComentariosAbiertos={setComentariosAbiertos}
              abrirMirrorEleccion={abrirMirrorEleccion}
              setAbrirMirrorEleccion={setAbrirMirrorEleccion}
              cargandoInteracciones={cargandoInteracciones[1]}
              setAbrirCita={contexto?.setAbrirCita!}
              manejarMeGusta={manejarMeGusta}
              manejarMirror={manejarMirror}
              manejarColeccionar={manejarColeccionar}
              setSeguirColeccionar={contexto?.setSeguirColeccionar!}
              setComentarPublicar={contexto?.setComentarPublicar!}
              setMencionarPerfiles={setMencionarPerfiles}
              setPerfilesAbiertos={setPerfilesAbiertos}
              comentarPublicar={contexto?.comentarPublicar!}
              perfilesAbiertos={perfilesAbiertos}
              publicacionCargando={pubCargando}
              manejarPublicar={manejarPublicar}
              mencionarPerfiles={mencionarPerfiles}
              lensConectado={contexto?.lensConectado}
              setVerImagen={contexto?.setVerImagen!}
              manejarArchivo={manejarArchivo}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
