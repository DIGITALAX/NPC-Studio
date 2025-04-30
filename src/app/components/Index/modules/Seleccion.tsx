import { FunctionComponent, JSX } from "react";
import Image from "next/legacy/image";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import { SeleccionProps } from "../types/index.type";

const Seleccion: FunctionComponent<SeleccionProps> = ({
  desafiantes,
  agentCollections,
  setDesafiantes,
  indice,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex flex-row overflow-x-scroll items-start justify-start">
      <div className="relative w-fit h-fit flex items-start justify-start gap-2">
        {agentCollections?.map((des, i: number) => {
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
                src={`${INFURA_GATEWAY_INTERNAL}${des?.tapa}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Seleccion;
