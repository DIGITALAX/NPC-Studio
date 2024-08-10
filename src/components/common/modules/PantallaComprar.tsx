"use client";
import ComprasCambio from "@/components/compras/modules/ComprasCambio";
import { PantallaComprarProps } from "../types/common.types";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";

function PantallaComprar({
  setManejarMostrarArticulo,
  manejarMostrarArticulo,
  articuloCargando,
  articulosActuales,
  dict,
  carritoCargando,
  setCarrito,
  comprarPublicacion,
  articuloSeleccionado,
  setMostrarPerfil,
  setArticuloSeleccionado,
  aprobarCargando,
  carrito,
  aprobarGastos,
  setArticuloIndice,
  articuloIndice,
  gastosAprobados,
  setVerImagen,
  datosOraculos,
  cumplimiento,
  setCumplimiento,
  comprarCarrito,
  pagina,
  setPagina,
}: PantallaComprarProps) {
  return (
    <div
      className="inset-0 justify-center fixed z-100 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={
        !carrito?.abierto
          ? (e) => {
              e.stopPropagation();
              e.preventDefault();
              setManejarMostrarArticulo(undefined);
            }
          : (e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!aprobarCargando && !carritoCargando) {
                setCarrito((prev) => ({
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
                src={`${INFURA_GATEWAY}/ipfs/${
                  carrito?.abierto
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
                      src={`${INFURA_GATEWAY}/ipfs/QmausveiBy11XUa4y3qurkaPGCPeV437XzUoPJTAG8H9qi`}
                    />
                  </div>
                </div>
              ) : (
                <ComprasCambio
                  dict={dict}
                  setMostrarPerfil={setMostrarPerfil}
                  pagina={pagina}
                  setPagina={setPagina}
                  comprarCarrito={comprarCarrito}
                  setCumplimiento={setCumplimiento}
                  carrito={carrito}
                  datosOraculos={datosOraculos}
                  setVerImagen={setVerImagen}
                  gastosAprobados={gastosAprobados}
                  articuloSeleccionado={articuloSeleccionado}
                  setArticuloSeleccionado={setArticuloSeleccionado}
                  manejarMostrarArticulo={manejarMostrarArticulo}
                  articulosActuales={articulosActuales}
                  carritoCargando={carritoCargando}
                  setCarrito={setCarrito}
                  articuloIndice={articuloIndice}
                  setArticuloIndice={setArticuloIndice}
                  comprarPublicacion={comprarPublicacion}
                  aprobarCargando={aprobarCargando}
                  aprobarGastos={aprobarGastos}
                  cumplimiento={cumplimiento}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PantallaComprar;
