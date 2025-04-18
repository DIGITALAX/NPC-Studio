import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";
import { FunctionComponent, JSX } from "react";
import { DropDownProps } from "../types/mint.types";

const DropDown: FunctionComponent<DropDownProps> = ({
  titulo,
  valor,
  manejarCambio,
  estaAbierto,
  setEstaAbierto,
  valores,
  manejarElegir,
  disabled,
  dict,
}): JSX.Element => {
  return (
    <div className="relative flex items-center justify-center flex-col w-52 h-fit">
      <div className="relative w-full h-fit flex text-white font-aust text-sm">
        {titulo}
      </div>
      <div className="relative w-full h-10 p-px flex flex-row items-center justify-center font-vcr text-white text-center rounded-sm border border-brillo">
        <div className="relative bg-black flex flex-row w-full h-full justify-start items-center p-2 gap-2">
          <div
            className={`relative flex items-center justify-center cursor-pointer w-4 h-3 `}
            onClick={() => !disabled && setEstaAbierto()}
          >
            <Image
              layout="fill"
              draggable={false}
              src={`${INFURA_GATEWAY}/ipfs/QmRKmMYJj7KAwf4BDGwrd51tKWoS8djnLGWT5XNdrJMztk`}
            />
          </div>
          <input
            className={`relative w-full h-full p-1.5 bg-black flex items-center justify-center text-white text-sm`}
            value={valor}
            disabled={!manejarCambio || disabled ? true : false}
            onChange={(e) => manejarCambio && manejarCambio(e)}
          />
        </div>
      </div>
      {estaAbierto && (
        <div
          className="absolute flex items-center justify-start w-full h-32 overflow-y-scroll z-10 bg-black top-12 py-px px-1 border border-brillo rounded-sm"
          id="dropDown"
        >
          <div
            className={`relative flex flex-row items-center justify-center h-fit gap-3 ${
              valores?.length < 1 ? "w-full" : "w-fit"
            }`}
          >
            {valores?.length < 1 ? (
              <div className="relative w-full px-2 h-fit flex items-center justify-center text-center text-xs break-all text-rosa font-con">
                {dict!?.Home.idi}
              </div>
            ) : (
              valores?.map(
                (value: { key: string; cover: string }, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`relative w-20 h-20 py-px items-center justify-center flex hover:opacity-70 cursor-pointer`}
                      onClick={() => manejarElegir(value.key)}
                    >
                      <Image
                        layout="fill"
                        src={`${INFURA_GATEWAY}/ipfs/${value.cover}`}
                        title={value.key}
                        objectFit={"contain"}
                        draggable={false}
                      />
                    </div>
                  );
                }
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
