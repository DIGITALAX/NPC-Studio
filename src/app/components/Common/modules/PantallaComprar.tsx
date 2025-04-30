"use client";
import Image from "next/legacy/image";
import { FunctionComponent, useContext, useState } from "react";
import { PantallaComprarProps } from "../types/common.types";
import { ModalContext } from "@/app/providers";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import ComprasCambio from "./ComprasCambio";

const PantallaComprar: FunctionComponent<PantallaComprarProps> = ({
  dict,
  manejarMostrarArticulo,
  setManejarMostrarArticulo,
  articuloCargando,
  articulosActuales,
  articuloSeleccionado,
  setArticuloSeleccionado,
  articuloIndice,
  setArticuloIndice,
}) => {
  const contexto = useContext(ModalContext);
  const [aprobarCargando, setAprobarCargando] = useState<boolean>(false);
  const [carritoCargando, setCarritoCargando] = useState<boolean>(false);

  return (
    <div
      className="inset-0 justify-center fixed z-60 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={
        !contexto?.carrito?.abierto
          ? (e) => {
              e.stopPropagation();
              e.preventDefault();
              setManejarMostrarArticulo(undefined);
            }
          : (e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!aprobarCargando && !carritoCargando) {
                contexto?.setCarrito((prev) => ({
                  ...prev,
                  abierto: false,
                }));
              }
            }
      }
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-oscuro cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div
          className="relative relative w-[100vw] max-w-[64rem] h-[calc(100vw*(40/64))] max-h-[40rem] flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div
            className={`absolute top-0 right-0 w-full h-full bg-black/80 flex flex-col items-center p-4 overflow-y-scroll gap-5 text-white justify-center`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="absolute top-0 right-0 w-full h-full">
              <Image
                draggable={false}
                layout="fill"
                objectFit="cover"
                src={`${INFURA_GATEWAY_INTERNAL}${
                  contexto?.carrito?.abierto
                    ? "QmPewgB2C1MEzQfyeewVRu8xeseYg5hBZ7WUTnpTvJWSyW"
                    : "QmUsrPxWX5wcnmVGt5WykDgTNDM3KHsjSrMZSxZui5u4rC"
                }`}
              />
            </div>
            <div
              className="relative w-[75%] h-[65%] items-start justify-center flex overflow-y-scroll"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {articuloCargando ? (
                <div className="relative w-full h-full flex items-center justify-center animate-pulse">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <Image
                      draggable={false}
                      layout="fill"
                      objectFit="contain"
                      src={`${INFURA_GATEWAY_INTERNAL}QmausveiBy11XUa4y3qurkaPGCPeV437XzUoPJTAG8H9qi`}
                    />
                  </div>
                </div>
              ) : (
                <ComprasCambio
                  dict={dict}
                  setManejarMostrarArticulo={setManejarMostrarArticulo}
                  manejarMostrarArticulo={manejarMostrarArticulo}
                  carritoCargando={carritoCargando}
                  aprobarCargando={aprobarCargando}
                  setAprobarCargando={setAprobarCargando}
                  setCarritoCargando={setCarritoCargando}
                  articulosActuales={articulosActuales}
                  articuloSeleccionado={articuloSeleccionado}
                  setArticuloSeleccionado={setArticuloSeleccionado}
                  articuloIndice={articuloIndice}
                  setArticuloIndice={setArticuloIndice}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantallaComprar;
