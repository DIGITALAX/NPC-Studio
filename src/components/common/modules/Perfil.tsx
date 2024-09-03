"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { PerfilProps } from "../types/common.types";
import useCuenta from "@/components/game/hooks/useCuenta";
import Cuenta from "@/components/game/modules/Cuenta";

function Perfil({
  setMostrarPerfil,
  mostrarPerfil,
  dict,
  lensConectado,
  escenas,
  publicClient,
  setIndexar,
  setErrorInteraccion,
}: PerfilProps) {
  const { perfil, seguirCargando, seguirNpc, dejarNpc, npcCargando, esNPC } =
    useCuenta(
      mostrarPerfil,
      lensConectado,
      publicClient,
      setIndexar,
      setErrorInteraccion,
      escenas
    );

  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setMostrarPerfil(undefined)}
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
            className={`flex flex-col items-center py-2 sm:py-10 px-2 sm:px-4 gap-5 text-white font-bit relative w-[75%] h-[65%] items-start justify-center flex overflow-y-scroll`}
          >
            <Cuenta
              dict={dict}
              npc={esNPC}
              perfil={perfil!}
              seguirCargando={seguirCargando}
              seguirNpc={seguirNpc}
              dejarNpc={dejarNpc}
              lensConectado={lensConectado}
              npcCargando={npcCargando}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
