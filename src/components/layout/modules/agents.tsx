"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { Dictionary } from "@/components/game/types/game.types";
import Cambio from "@/components/agentes/modules/Cambio";
import useAgentes from "@/components/agentes/hooks/useAgentes";
import { Pantalla } from "@/components/agentes/types/agentes.types";

export default function Agents({
  lang,
  dict,
}: {
  lang: string;
  dict: Dictionary;
}) {
  const { pantallaCambio, setPantallaCambio } = useAgentes();

  return (
    <div className="relative w-full h-fit min-w-screen flex items-start justify-start min-h-screen bg-black pb-14 flex-col">
      <div className="relative w-full h-full flex items-stretch justify-start flex-row">
        <div className="relative w-60 shrink-0 flex">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmSfZKsL8SySAa2FhSmw6cH9rqwDhnXM58HcqKMxT4E8Mo`}
            layout="fill"
            objectFit="fill"
            draggable={false}
          />
        </div>
        <div className="relative w-32 shrink-0 flex border-x-2 border-white bg-turq text-white text-lg font-clar">
          <div className="relative rotate-90 w-fit h-fit">palabras</div>
        </div>
        <div className="relative w-full h-full items-stretch justify-start flex flex-col gap-6 pl-10 pr-3 py-2 grow">
          <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-row">
            <div
              className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
                lang == "en" ? "text-[10vw]" : "text-[8vw]"
              }`}
            >
              {dict.Home.title}
            </div>
            <div className="absolute top-3 right-3 w-fit flex-row flex h-fit items-end justify-start gap-2">
              <div className="relative flex w-8 h-8 flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmUfJojpNhnpGhrynj9edpJPBm4johzGvNcyMnAADgqdDC`}
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                />
              </div>
              <div className="relative flex w-8 h-8 flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmWmfupyTZwUAM85VAJBNaXhek8ATnqLGZeZFS5msPHY4c`}
                  layout="fill"
                  objectFit="contain"
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className="relative w-full h-fit flex items-center justify-between gap-6 flex-row font-clar">
            <div
              className={`text-white relative w-fit whitespace-nowrap h-fit flex items-start justify-start text-[2vw]`}
            >
              {dict.Home.indice}
            </div>
            <div className="relative w-full h-fit flex gap-1.5 items-center justify-end flex-wrap text-xxs">
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
                  pantalla: Pantalla.Especte,
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
                      } ${
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
          <Cambio pantallaCambio={pantallaCambio} lang={lang} dict={dict} />
        </div>
      </div>
    </div>
  );
}
