"use client";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";
import Cuenta from "./Cuenta";
import useCuenta from "../hooks/useCuenta";
import { PerfileProps } from "../types/modals.types";

function Perfil({ setMostrarPerfil, dict }: PerfileProps) {
  const { perfil, seguirCargando, seguirNpc, dejarNpc, npcCargando } =
    useCuenta(dict);

  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setMostrarPerfil(undefined);
      }}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-oscuro border border-white rounded-md cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] max-w-[64rem] h-[calc(100vw*(40/64))] max-h-[40rem] flex items-center justify-center">
          <Image
            draggable={false}
            layout="fill"
            objectFit="cover"
            src={`${INFURA_GATEWAY}/ipfs/QmUsrPxWX5wcnmVGt5WykDgTNDM3KHsjSrMZSxZui5u4rC`}
          />

          <div
            className={`flex flex-col items-center py-2 sm:py-10 px-2 sm:px-4 gap-5 text-white font-bit relative w-[75%] h-[65%] justify-center flex overflow-y-scroll`}
          >
            <Cuenta
              dict={dict}
              perfil={perfil!}
              seguirCargando={seguirCargando}
              seguirNpc={seguirNpc}
              dejarNpc={dejarNpc}
              npcCargando={npcCargando}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
