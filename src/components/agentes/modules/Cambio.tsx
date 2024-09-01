import { FunctionComponent } from "react";
import Agentes from "./Agentes";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import Puntaje from "./Puntaje";
import { CambioProps, Pantalla } from "../types/agentes.types";

const Cambio: FunctionComponent<CambioProps> = ({
  pantallaCambio,
  lang,
  dict,
}): JSX.Element => {
  switch (pantallaCambio) {
    case Pantalla.Desafiante:
      return <div></div>;

    case Pantalla.Especte:
      return <div></div>;

    case Pantalla.Tabla:
      return <div></div>;

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
            <Puntaje />
            <div className="relative w-fit h-fit flex items-center justify-center flex-col gap-3">
              <div className="relative w-52 h-52 rounded-full flex items-center justify-center">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmVUd78Y5zAjsF6saC4SnRmQYAqnqTrTNRLErGBKz7zbZY`}
                  layout="fill"
                  objectFit="cover"
                  draggable={false}
                />
              </div>
              <div className="relative w-fit h-fit flex items-center justify-center break-words font-clar text-[#A9FDCA]">
                algo de texto
              </div>
            </div>
            <Agentes />
          </div>
          <div
            className={`relative mb-0 w-full h-fit flex items-center justify-end`}
          >
            <div className="relativew-full h-60 flex items-center justify-end">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmTPTQ7w3ZWETDBwsC5HB2TkcHTik85Hpy9thbXZg6nREw`}
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
