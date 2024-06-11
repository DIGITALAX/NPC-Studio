"use client";
import { SetStateAction } from "react";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { Dictionary } from "../types/game.types";
import { AiOutlineLoading } from "react-icons/ai";

function Notificacion({
  setMostrarNotificacion,
  dict,
  mensajeCargando,
  manejarEnviarMensaje,
  setMensaje,
  mensaje,
}: {
  setMostrarNotificacion: (e: SetStateAction<boolean>) => void;
  dict: Dictionary;
  manejarEnviarMensaje: () => Promise<void>;
  mensajeCargando: boolean;
  setMensaje: (e: string) => void;
  mensaje: string;
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
          <div className="absolute top-0 right-0 w-full h-full bg-black/80 flex flex-col items-center justify-start py-10 px-4 gap-5 text-white font-vcr">
            <div className="relative w-3/4 h-fit flex items-center justify-center text-lg text-center">
              {dict.Home.notif}
            </div>
            <textarea
              className={`relative w-3/4 h-full flex items-center justify-center bg-black p-2 text-sm border border-white ${
                mensaje === dict.Home.sent ? "text-white" : "text-gray-500"
              }`}
              style={{ resize: "none" }}
              onChange={(e) => setMensaje(e.target.value)}
              value={mensaje}
            ></textarea>
            <div
              className={`absolute bottom-2 right-2 flex items-center justify-center w-16 text-xs border border-white h-8 ${
                !mensajeCargando && "cursor-pointer active:scale-95"
              }`}
              onClick={() => !mensajeCargando && manejarEnviarMensaje()}
            >
              <div
                className={`relative w-fit h-fit flex items-center justify-center ${
                  mensajeCargando ? "animate-spin" : "top-px"
                }`}
              >
                {mensajeCargando ? (
                  <AiOutlineLoading color="#46B171" size={10} />
                ) : (
                  dict.Home.send
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notificacion;
