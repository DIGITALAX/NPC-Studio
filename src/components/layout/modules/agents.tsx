"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { Dictionary } from "@/components/game/types/game.types";
import Cambio from "@/components/agentes/modules/Cambio";
import useAgentes from "@/components/agentes/hooks/useAgentes";
import { Pantalla } from "@/components/agentes/types/agentes.types";
import { VerticalTicker, HorizontalTicker } from "react-infinite-ticker";
import { ModalContext } from "@/app/providers";
import { useContext } from "react";
import Ticker from "@/components/common/modules/Ticker";
import { useRouter } from "next/navigation";
import useAccountPropia from "@/components/game/hooks/useAccount";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { http, useAccount } from "wagmi";
import { polygon } from "viem/chains";
import { createPublicClient } from "viem";

export default function Agents({
  lang,
  dict,
}: {
  lang: string;
  dict: Dictionary;
}) {
  const router = useRouter();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected } = useAccount();
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  });
  const contexto = useContext(ModalContext);
  const {
    pantallaCambio,
    setPantallaCambio,
    atributos,
    pantalla,
    todosLosNPCs,
    mostrarMas,
    setMostrarMas,
    npcsCargando,
    informacion,
    espectadorInfo,
    cogerCargando,
    manejarCoger,
    tokensGuardados,
    setDesafiantes,
    desafiantes,
    todosLosDesafiantes,
    tabla,
  } = useAgentes(
    contexto?.lensConectado,
    contexto?.setEscenas!,
    contexto?.escenas!,
    publicClient,
    address!,
    contexto?.setVoto!,
    dict
  );

  const { manejarLens, manejarSalir, lensCargando } = useAccountPropia(
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
        <div className="relative w-full h-full items-stretch justify-start flex flex-col gap-6 lg:pl-10 pr-1 pl-1 lg:pr-3 py-2 grow">
          <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row">
            <div
              className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
                lang == "en"
                  ? "text-[8vw] 1xl:text-[10vw]"
                  : "text-[6vw] 1xl:text-[8vw]"
              }`}
            >
              {dict.Home.title}
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
          <div className="relative w-full h-fit flex items-center justify-between gap-6 flex-col lg:flex-row font-clar">
            <div
              className={`text-white relative w-fit whitespace-nowrap h-fit flex items-start justify-start text-[2vw]`}
            >
              {dict.Home.indice}
            </div>
            <div className="relative w-full h-fit flex gap-1.5 items-center justify-center lg:justify-end flex-wrap text-xxs">
              {[
                {
                  titulo: dict.Home.score,
                  texto: "#06080A",
                  fondo: "#B9FFFF",
                  border: "#FFE72B",
                  sombra: "#1239F6",
                  pantalla: Pantalla.Puntaje,
                },
                {
                  titulo: dict.Home.chall,
                  texto: "#06080A",
                  fondo: "#F6FC8D",
                  border: "#FF1493",
                  sombra: "#1239F6",
                  pantalla: Pantalla.Desafiante,
                },
                {
                  titulo: dict.Home.game,
                  texto: "#65B0FF",
                  fondo: "#A0FF9C",
                  border: "#000000",
                  sombra: "#F6F909",
                  pantalla: Pantalla.Juego,
                  inactivo: true,
                },
                {
                  titulo: dict.Home.leader,
                  texto: "#06080A",
                  fondo: "#C993FF",
                  border: "#00FF00",
                  sombra: "#FF1493",
                  pantalla: Pantalla.Tabla,
                },
                {
                  titulo: dict.Home.spec,
                  texto: "#06080A",
                  fondo: "#FFD700",
                  border: "#9933FF",
                  sombra: "#FF1493",
                  pantalla: Pantalla.Espectador,
                },
              ].map(
                (
                  elemento: {
                    titulo: string;
                    texto: string;
                    fondo: string;
                    border: string;
                    sombra: string;
                    pantalla: Pantalla;
                    inactivo?: boolean;
                  },
                  indice
                ) => {
                  return (
                    <div
                      key={indice}
                      className={`relative text-center rounded-full w-fit h-fit flex items-center justify-center px-4 py-2 border ${
                        pantallaCambio == elemento.pantalla && "opacity-70"
                      }  ${
                        !elemento.inactivo &&
                        "cursor-pointer active:scale-95 hover:opacity-70"
                      }`}
                      onClick={() =>
                        !elemento.inactivo &&
                        setPantallaCambio(elemento.pantalla)
                      }
                      style={{
                        color: elemento.texto,
                        backgroundColor: elemento.fondo,
                        borderColor: elemento.border,
                        boxShadow: `2px 2px 4px ${elemento.sombra}`,
                      }}
                    >
                      {elemento.titulo}
                    </div>
                  );
                }
              )}
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
          <Cambio
            tabla={tabla}
            desafiantes={desafiantes}
            setDesafiantes={setDesafiantes}
            tokensGuardados={tokensGuardados!}
            espectadorInfo={espectadorInfo!}
            todosLosDesafiantes={todosLosDesafiantes}
            todosLosNPCs={todosLosNPCs}
            pantallaCambio={pantallaCambio}
            lang={lang}
            manejarCoger={manejarCoger}
            cogerCargando={cogerCargando}
            dict={dict}
            router={router}
            setMostrarMas={setMostrarMas}
            mostrarMas={mostrarMas}
            npcsCargando={npcsCargando}
            informacion={informacion}
            escenas={contexto?.escenas!}
            manejarLens={manejarLens}
            manejarSalir={manejarSalir}
            lensCargando={lensCargando}
            openConnectModal={openConnectModal}
            isConnected={isConnected}
            lensConectado={contexto?.lensConectado}
          />
        </div>
      </div>
    </div>
  );
}
