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
import useEspectador from "@/components/post/hooks/useEspectador";
import { Post as PostType } from "../../../../graphql/generated";
import { VerticalTicker, HorizontalTicker } from "react-infinite-ticker";
import Ticker from "@/components/common/modules/Ticker";
import Evaluacion from "@/components/post/modules/Evaluacion";
import Historia from "@/components/post/modules/Historia";

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
  const { pubCargando, pub, setPub, atributos, pantalla } = usePub(
    id?.id as string,
    contexto?.lensConectado,
    contexto?.setEscenas!,
    contexto?.escenas!,
    contexto?.setEscena!
  );
  const { manejarLens, setOpcionAbierta } = useAccountPropia(
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
    setPerfilesAbiertos,
    setMencionarPerfiles,
    setCaretCoord,
    perfilesAbiertos,
    caretCoord,
    mencionarPerfiles,
    manejarPublicar,
    manejarArchivo,
  } = useDialog(
    address,
    publicClient,
    contexto?.setIndexar!,
    contexto?.setErrorInteraccion!,
    contexto?.escena!,
    contexto?.comentarPublicar!,
    contexto?.setComentarPublicar!,
    isConnected,
    openConnectModal,
    manejarLens,
    contexto?.lensConectado
  );
  const { manejarVotar, votarCargando, pubVotar, setPubVotar, historia } =
    useEspectador();
  if (
    pubCargando ||
    pub?.length < 1 ||
    !pub ||
    Number(contexto?.escenas?.length) < 1 ||
    !contexto?.escena
  ) {
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
        <div className="relative w-full h-full items-stretch justify-start flex flex-col gap-6 p-2 sm:p-4 md:p-8 grow">
          <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row">
            <div
              className={`text-white font-lib relative w-full h-fit flex items-start justify-start text-[8vw] 1xl:text-[10vw] overflow-x-hidden`}
            >
              {dict.Home.espectar}
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
          <div className="relative w-full h-fit flex flex-col gap-10 items-start justify-start">
            <div className="relative w-full md:w-2/3 h-fit flex items-center justify-center">
              <Publicacion
                menos
                router={router}
                setMostrarPerfil={contexto?.setMostrarPerfil!}
                setMostrarInteracciones={contexto?.setMostrarInteracciones!}
                setOpcionAbierta={setOpcionAbierta}
                key={0}
                sin
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
            <div className="relative w-full flex items-start justify-center h-fit flex-col gap-2">
              <div className="text-white text-sm font-lib flex items-center justify-center">
                {dict.Home.eval}
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
                  manejarVotar={manejarVotar}
                  votarCargando={votarCargando}
                  pubVotar={pubVotar}
                  setPubVotar={setPubVotar}
                />
              </div>
            </div>
            <Historia dict={dict} historia={historia} />
            <div className="relative w-full h-fit flex items-center justify-start flex-col gap-3">
              <div className="relative w-full h-fit flex items-start justify-start font-lib text-2xl text-white">
                {dict.Home.datos}
              </div>
              {!atributos ? (
                <div className="relative w-full h-fit flex items-center justify-start text-limon font-lib text-xs">
                  {dict.Home.nodatos}
                </div>
              ) : (
                <div className="relative p-2 md:p-4 flex flex-col gap-10 items-start justify-start w-full h-full border border-prima">
                  <div className="relative w-full h-fit flex items-end justify-end flex-col gap-2">
                    <div className="relative w-fit h-fit flex items-end justify-end font-clar text-costa break-words text-xxs">
                      {dict.Home.descargar}
                    </div>
                    <div
                      className="relative w-7 h-4 flex items-end justify-end cursor-pointer"
                      onClick={() =>
                        window.open(
                          `${INFURA_GATEWAY}/ipfs/${
                            (pub?.[0] as PostType)?.metadata?.attributes
                              ?.find(
                                (at) => at.key?.toLowerCase() == "llm_info"
                              )!
                              ?.value?.split("ipfs://")?.[1]
                          }`
                        )
                      }
                    >
                      <Image
                        draggable={false}
                        layout="fill"
                        objectFit="cover"
                        src={`${INFURA_GATEWAY}/ipfs/QmRwz6Ptd77ocQ7vvns5A7GoDrRyU7VcjtAbZSXyeriUMK`}
                      />
                    </div>
                  </div>
                  <div className="relative w-full flex flex-col gap-4 text-xs items-start justify-start flex-wrap">
                    <div className="relative w-full h-fit flex items-center justif-between flex-row gap-6 sm:flex-nowrap flex-wrap">
                      <div className="relative w-full h-fit flex items-start justify-between flex-row gap-2">
                        <div className="relative w-fit h-fit flex items-center justify-center py-1 px-3 bg-triste font-clar text-black break-words">
                          {dict.Home.modelo}
                        </div>
                        <div className="relative w-8 h-5 flex items-center justify-center">
                          <Image
                            layout="fill"
                            draggable={false}
                            src={`${INFURA_GATEWAY}/ipfs/QmZpNKd3zcpQQoqtFLk1KPSh2hgvrd76hrQiTeafX1V2UX`}
                          />
                        </div>
                        <div className="relative w-fit h-fit flex items-center justify-center text-white text-sm">
                          {atributos?.options?.model}
                        </div>
                      </div>
                      <div className="relative w-full h-fit flex items-start justify-between flex-row gap-2">
                        <div className="relative w-fit h-fit flex items-center justify-center py-1 px-3 bg-triste font-clar text-black break-words">
                          CTX
                        </div>
                        <div className="relative w-8 h-5 flex items-center justify-center">
                          <Image
                            layout="fill"
                            draggable={false}
                            src={`${INFURA_GATEWAY}/ipfs/QmSs3ipShCv4FKFRJWUUEmSGKimVnjBJ1157tAwsW94UNN`}
                          />
                        </div>
                        <div className="relative w-fit h-fit flex items-center justify-center text-white text-sm">
                          {atributos?.options?.ctx}
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex items-center justif-between flex-row gap-6 sm:flex-nowrap flex-wrap">
                      <div className="relative w-full h-fit flex items-start justify-between flex-row gap-2">
                        <div className="relative w-fit h-fit flex items-center justify-center py-1 px-3 bg-triste font-clar text-black break-words">
                          {dict.Home.num}
                        </div>
                        <div className="relative w-8 h-5 flex items-center justify-center">
                          <Image
                            layout="fill"
                            draggable={false}
                            src={`${INFURA_GATEWAY}/ipfs/QmXCA1mRM4Mg43xUTuwrw2v9HyUGsQsC4HCmFrcMr38ML8`}
                          />
                        </div>
                        <div className="relative w-fit h-fit flex items-center justify-center text-white text-sm">
                          {atributos?.options?.num_tokens}
                        </div>
                      </div>
                      <div className="relative w-full h-fit flex items-start justify-between flex-row gap-2">
                        <div className="relative w-fit h-fit flex items-center justify-center py-1 px-3 bg-triste font-clar text-black break-words">
                          {dict.Home.tokenizer}
                        </div>
                        <div className="relative w-8 h-5 flex items-center justify-center">
                          <Image
                            layout="fill"
                            draggable={false}
                            src={`${INFURA_GATEWAY}/ipfs/QmcovVHBUaYwVeGivNi7CDp8DrcLqT6smEkvzTtP13eqGC`}
                          />
                        </div>
                        <div className="relative w-fit h-fit flex items-center justify-center text-white text-sm">
                          {atributos?.options?.tokenizer}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-fit lg:h-[60rem] flex items-center justify-between flex-col lg:flex-row gap-8">
                    <div className="relative w-full h-72 lg:h-full flex items-center justify-center border border-ami">
                      <Image
                        draggable={false}
                        layout="fill"
                        objectFit="cover"
                        src={`${INFURA_GATEWAY}/ipfs/QmacRtSpqUAuVig7KyGw1uHPwm1QXbUjhqJW4W8RJRjidM`}
                      />
                    </div>
                    <div className="relative w-full h-fit lg:h-full flex flex-col gap-12 items-start justify-between grow">
                      <div className="relative w-full h-fit flex flex-col gap-8 items-start justify-start">
                        <div className="relative w-full h-fit flex flex-col gap-2 items-center justify-center">
                          <div className="relative w-fit h-fit flex items-center justify-center py-1 px-4 bg-triste font-clar text-costa text-xs break-words">
                            {dict.Home.prompt}
                          </div>
                          <div className="relative w-fit h-40 flex items-start justify-start font-at text-costa text-sm break-words p-1.5 border border-[#6FFA95] flex-row justify-between gap-3">
                            <div className="relative w-fit h-full flex items-center justify-center">
                              <div className="relative w-8 h-8 flex items-center justify-center">
                                <Image
                                  draggable={false}
                                  layout="fill"
                                  objectFit="contain"
                                  src={`${INFURA_GATEWAY}/ipfs/QmQPeBDpsLDYZaEcHVdFZusom8rpVfkVyGYyD5z9enqHn3`}
                                />
                              </div>
                            </div>
                            <div className="relative flex w-full h-full flex items-start justify-start overflow-y-scroll">
                              <div className="relative w-full h-fit flex items-start justify-start text-right">
                                {atributos.prompt}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative w-full h-fit flex flex-col gap-2 items-center justify-center">
                          <div className="relative w-fit h-fit flex items-center justify-center py-1 px-4 bg-triste font-clar text-costa text-xs break-words">
                            {dict.Home.inputs}
                          </div>
                          <div className="relative w-full flex flex-row items-center justify-center gap-1">
                            <div className="relative w-fit h-full flex items-center justify-center">
                              <div className="relative w-8 h-5 flex items-center justify-center">
                                <Image
                                  layout="fill"
                                  draggable={false}
                                  src={`${INFURA_GATEWAY}/ipfs/QmZpNKd3zcpQQoqtFLk1KPSh2hgvrd76hrQiTeafX1V2UX`}
                                />
                              </div>
                            </div>
                            <div className="relative w-full flex items-start justify-start text-xs break-all bg-[#CC04FD] p-1.5 h-40 overflow-y-scroll text-white font-bit text-center">
                              {atributos.mensaje.input_tokens.join(", ")}
                            </div>
                            <div className="relative w-fit h-full flex items-center justify-center">
                              <div className="relative w-8 h-5 flex items-center justify-center">
                                <Image
                                  layout="fill"
                                  draggable={false}
                                  src={`${INFURA_GATEWAY}/ipfs/QmSs3ipShCv4FKFRJWUUEmSGKimVnjBJ1157tAwsW94UNN`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full h-fit flex flex-col gap-8 items-start justify-start">
                        <div className="relative w-full h-fit flex flex-col gap-2 items-center justify-center">
                          <div className="relative w-fit h-fit flex items-center justify-center py-1 px-4 bg-triste font-clar text-costa text-xs break-words">
                            {dict.Home.respuesta}
                          </div>
                          <div className="relative w-fit h-40 flex items-start justify-start font-at text-[#F6FC8D] text-sm break-words p-1.5 border border-rosas flex-row justify-between gap-3">
                            <div className="relative w-fit h-full flex items-center justify-center">
                              <div className="relative w-8 h-8 flex items-center justify-center">
                                <Image
                                  draggable={false}
                                  layout="fill"
                                  objectFit="contain"
                                  src={`${INFURA_GATEWAY}/ipfs/QmVaB1MmMHkyEAni1NFb6hkMFC3nWFEiwSWAEibjK9CuFv`}
                                />
                              </div>
                            </div>
                            <div className="relative flex w-full h-full flex items-start justify-start overflow-y-scroll">
                              <div className="relative w-full h-fit flex items-start justify-start text-right">
                                {atributos.mensaje.output}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative w-full h-fit flex flex-col gap-2 items-center justify-center">
                          <div className="relative w-fit h-fit flex items-center justify-center py-1 px-4 bg-triste font-clar text-costa text-xs break-words">
                            {dict.Home.outputs}
                          </div>
                          <div className="relative w-full flex flex-row items-center justify-center gap-1">
                            <div className="relative w-fit h-full flex items-center justify-center">
                              <div className="relative w-8 h-5 flex items-center justify-center">
                                <Image
                                  layout="fill"
                                  draggable={false}
                                  src={`${INFURA_GATEWAY}/ipfs/QmXCA1mRM4Mg43xUTuwrw2v9HyUGsQsC4HCmFrcMr38ML8`}
                                />
                              </div>
                            </div>
                            <div className="relative w-full flex items-start justify-start text-xs break-all bg-prima p-1.5 h-40 overflow-y-scroll text-black font-bit text-center">
                              {atributos.mensaje.output_tokens.join(", ")}
                            </div>
                            <div className="relative w-fit h-full flex items-center justify-center">
                              <div className="relative w-8 h-5 flex items-center justify-center">
                                <Image
                                  layout="fill"
                                  draggable={false}
                                  src={`${INFURA_GATEWAY}/ipfs/QmcovVHBUaYwVeGivNi7CDp8DrcLqT6smEkvzTtP13eqGC`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-fit flex flex-col gap-3 items-start justify-center">
                    <div className="relative w-full h-fit flex flex-col gap-1 items-start justify-start pt-4">
                      <div className="relative w-1/2 h-fit flex justify-start items-start font-at text-white text-base">
                        {dict.Home.pca1}
                      </div>
                      <div className="relative w-full h-40 sm:h-72 md:h-96 flex items-center justify-center">
                        <Image
                          src={`${INFURA_GATEWAY}/ipfs/${
                            atributos?.hashes?.[0]?.split("ipfs://")?.[1]
                          }`}
                          layout="fill"
                          objectFit="fill"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-1 items-start justify-start">
                      <div className="relative w-1/2 h-fit flex justify-start items-start font-at text-white text-base">
                        {dict.Home.pca2}
                      </div>
                      <div className="relative w-full h-40 sm:h-72 md:h-96 flex items-center justify-center">
                        <Image
                          src={`${INFURA_GATEWAY}/ipfs/${
                            atributos?.hashes?.[1]?.split("ipfs://")?.[1]
                          }`}
                          layout="fill"
                          objectFit="fill"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-1 items-start justify-start pt-4">
                      <div className="relative w-1/2 h-fit flex justify-start items-start font-at text-white text-base">
                        {dict.Home.pca3}
                      </div>
                      <div className="relative w-full h-40 sm:h-72 md:h-96 flex items-center justify-center">
                        <Image
                          src={`${INFURA_GATEWAY}/ipfs/${
                            atributos?.hashes?.[2]?.split("ipfs://")?.[1]
                          }`}
                          layout="fill"
                          objectFit="fill"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-1 items-start justify-start">
                      <div className="relative w-1/2 h-fit flex items-start justify-start font-at text-white text-base">
                        {dict.Home.pca4}
                      </div>
                      <div className="relative w-full h-40 sm:h-72 md:h-96 flex items-center justify-center">
                        <Image
                          src={`${INFURA_GATEWAY}/ipfs/${
                            atributos?.hashes?.[3]?.split("ipfs://")?.[1]
                          }`}
                          layout="fill"
                          objectFit="fill"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-1 items-start justify-start pt-4">
                      <div className="relative w-1/2 h-fit flex justify-start items-start font-at text-white text-base">
                        {dict.Home.pca5}
                      </div>
                      <div className="relative w-full h-40 sm:h-72 md:h-96 flex items-center justify-center">
                        <Image
                          src={`${INFURA_GATEWAY}/ipfs/${
                            atributos?.hashes?.[4]?.split("ipfs://")?.[1]
                          }`}
                          layout="fill"
                          objectFit="fill"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-1 items-start justify-start">
                      <div className="relative w-1/2 h-fit flex items-start justify-start font-at text-white text-base">
                        {dict.Home.pca6}
                      </div>
                      <div className="relative w-full h-40 sm:h-72 md:h-96 flex items-center justify-center">
                        <Image
                          src={`${INFURA_GATEWAY}/ipfs/${
                            atributos?.hashes?.[5]?.split("ipfs://")?.[1]
                          }`}
                          layout="fill"
                          objectFit="fill"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmdRLJ8bWfTgJ92TiXTQU4wU46xtYURebNNRC4qyBMkCN8`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
