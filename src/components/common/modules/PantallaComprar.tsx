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
      className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setManejarMostrarArticulo(undefined);
      }}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-black border border-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] sm:w-[45vw] xl:w-[40vw] h-fit max-h-[90vh] min-h-[40vh] xl:min-h-[60vh] flex items-center justify-center">
          <div
            className={`absolute top-0 right-0 w-full h-full bg-black/80 flex flex-col items-center p-4 overflow-y-scroll gap-5 text-white font-vcr justify-start`}
          >
            <div className="absolute top-0 right-0 w-full h-full">
              <Image
                draggable={false}
                layout="fill"
                objectFit="cover"
                src={`${INFURA_GATEWAY}/ipfs/QmYLfb5D3zTRoGLueuVjDwSom6RhaHCkoaT7gh7bbNsS1c`}
              />
            </div>
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
  );
}

export default PantallaComprar;
