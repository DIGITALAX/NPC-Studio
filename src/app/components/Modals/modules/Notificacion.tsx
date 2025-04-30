"use client";
import Image from "next/legacy/image";
import NotificacionCambio from "./NotificacionCambio";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import {
  NotificacionProps,
  Notificacion as NotificacionType,
} from "../types/modals.types";
import { useContext } from "react";
import { ModalContext } from "@/app/providers";

function Notificacion({ dict }: NotificacionProps) {
  const context = useContext(ModalContext);
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        context?.setMostrarNotificacion(NotificacionType.Inactivo);
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
            src={`${INFURA_GATEWAY_INTERNAL}QmUsrPxWX5wcnmVGt5WykDgTNDM3KHsjSrMZSxZui5u4rC`}
          />
          <div
            className={`flex flex-col items-center py-10 px-4 gap-5 text-white font-bit relative w-[75%] h-[65%] items-start justify-center overflow-y-scroll ${
              context?.mostrarNotificacion == NotificacionType.Diseñador
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <div className="relative w-full items-center justify-start flex flex-col gap-6 h-fit">
              <NotificacionCambio
                tipo={context?.mostrarNotificacion!}
                dict={dict}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notificacion;
