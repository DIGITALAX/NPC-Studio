"use client";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";
import { VerticalTicker, HorizontalTicker } from "react-infinite-ticker";
import Ticker from "./Ticker";
import { Pantalla } from "../types/index.type";
import useAgents from "../hooks/useAgents";
import Cambio from "./Cambio";

export default function Agents({ lang, dict }: { lang: string; dict: any }) {
  const {
    pantallaCambiada,
    pantalla,
    setPantallaCambiada,
    agentCollections,
    agentCollectionsCargando,
  } = useAgents();
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
              <VerticalTicker  duration={9000}>
                <Ticker pantalla={pantalla} agentCollections={agentCollections} />
              </VerticalTicker>
            ) : (
              <HorizontalTicker duration={9000}>
                <Ticker pantalla={pantalla} agentCollections={agentCollections} />
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
                  },
                  indice
                ) => {
                  return (
                    <div
                      key={indice}
                      className={`relative text-center rounded-full w-fit h-fit flex items-center justify-center px-4 py-2 border ${
                        pantallaCambiada == elemento.pantalla && "opacity-70"
                      }  ${"cursor-pointer active:scale-95 hover:opacity-70"}`}
                      onClick={() => setPantallaCambiada(elemento.pantalla)}
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
            agentCollectionsCargando={agentCollectionsCargando}
            setPantallaCambiada={setPantallaCambiada}
            lang={lang}
            agentCollections={agentCollections}
            dict={dict}
            pantallaCambiada={pantallaCambiada}
          />
        </div>
      </div>
    </div>
  );
}
