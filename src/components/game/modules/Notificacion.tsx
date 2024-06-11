"use client";
import { SetStateAction } from "react";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { Dictionary } from "../types/game.types";

function Notificacion({
  setMostrarNotificacion,
  dict,
}: {
  setMostrarNotificacion: (e: SetStateAction<boolean>) => void;
  dict: Dictionary;
}) {
  return (
    <div
      className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setMostrarNotificacion(false)}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-black border border-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] sm:w-[45vw] xl:w-[40vw] h-fit max-h-[90vh] min-h-[40vh] xl:min-h-[60vh] flex items-center justify-center">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmPJfQsZCRjmybac9AYZaovYyBxQ6AhjwX3XNp1WkHf1vQ`}
            draggable={false}
            layout="fill"
          />
          <div className="absolute top-0 right-0 w-full h-full bg-black/80 flex items-center justify-center">
            <div className="relative w-3/4 h-fit flex items-center justify-center text-white text-lg text-center font-leco">
              {dict.Home.notif}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notificacion;
