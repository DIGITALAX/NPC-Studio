import { FunctionComponent } from "react";
import { Desafiante, SeleccionProps } from "../types/agentes.types";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";

const Seleccion: FunctionComponent<SeleccionProps> = ({
  desafiantes,
  todosLosDesafiantes,
  setDesafiantes,
  indice,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex flex-row overflow-x-scroll items-start justify-start">
      <div className="relative w-fit h-fit flex items-start justify-start gap-2">
        {todosLosDesafiantes?.map((des: Desafiante, i: number) => {
          return (
            <div
              key={i}
              className={`relative w-10 h-20 flex items-center justify-center cursor-pointer hover:opacity-70 active:scale-95 ${
                desafiantes?.find((d) => d.etiqueta == des.etiqueta) &&
                "opacity-50"
              }`}
              onClick={() =>
                setDesafiantes((prev) => {
                  const defs = [...prev];

                  defs[indice] = des;

                  return defs;
                })
              }
            >
              <Image
                draggable={false}
                layout="fill"
                objectFit="contain"
                src={`${INFURA_GATEWAY}/ipfs/${des?.tapa_dos}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Seleccion;
