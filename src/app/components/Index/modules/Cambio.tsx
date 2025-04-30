import { FunctionComponent, JSX } from "react";
import Image from "next/legacy/image";
import { CambioProps, Pantalla } from "../types/index.type";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import AgentMap from "./AgentMap";
import Puntaje from "./Puntaje";
import Desafiantes from "./Desafiantes";
import Juego from "./Juego";
import Tabla from "./Tabla";
import Espectador from "./Espectador";

const Cambio: FunctionComponent<CambioProps> = ({
  pantallaCambiada,
  setPantallaCambiada,
  lang,
  agentCollections,
  agentCollectionsCargando,
  dict,
}): JSX.Element => {
  switch (pantallaCambiada) {
    case Pantalla.Juego:
      return <Juego dict={dict} lang={lang} />;

    case Pantalla.Desafiante:
      return (
        <Desafiantes
          dict={dict}
          lang={lang}
          agentCollections={agentCollections}
          agentCollectionsCargando={agentCollectionsCargando}
        />
      );

    case Pantalla.Espectador:
      return <Espectador dict={dict} lang={lang} />;

    case Pantalla.Tabla:
      return (
        <Tabla
          lang={lang}
          dict={dict}
          agentCollections={agentCollections}
          agentCollectionsCargando={agentCollectionsCargando}
        />
      );

    default:
      return (
        <>
          <div
            className={`text-white font-lib relative w-full h-fit flex items-start justify-start ${
              lang == "en" ? "text-[8vw]" : "text-[6vw]"
            }`}
          >
            {dict.Home.scorecard}
          </div>
          <div className="relative w-full h-fit py-20 flex items-center justify-center flex-col gap-24">
            <Puntaje dict={dict} />
            <div className="relative w-fit h-fit flex items-center justify-center flex-col gap-3">
              <div
                className="relative w-36 text-xs font-bit text-viol h-8 flex items-center justify-center cursor-pointer hover:opacity-70"
                onClick={() =>
                  !agentCollectionsCargando &&
                  setPantallaCambiada(Pantalla.Juego)
                }
              >
                <Image
                  src={`${INFURA_GATEWAY_INTERNAL}QmY45n5J9eJxGpb74KkU9BYUqv6K2bXKvJUUigEKtHWy9s`}
                  layout="fill"
                  objectFit="fill"
                  draggable={false}
                />
                <div className="absolute w-full h-full flex items-center justify-center whitespace-nowrap">
                  {dict.Home.todaActividad}
                </div>
              </div>
              <div className="relative lg:w-1/2 w-4/5 h-fit flex items-center justify-center break-words text-xs text-center font-clar text-limon">
                {dict.Home.stats}
              </div>
            </div>
            <AgentMap
              agentCollections={agentCollections}
              agentCollectionsCargando={agentCollectionsCargando}
              dict={dict}
            />
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY_INTERNAL}QmTPTQ7w3ZWETDBwsC5HB2TkcHTik85Hpy9thbXZg6nREw`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </>
      );
  }
};

export default Cambio;
