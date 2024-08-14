import { FunctionComponent } from "react";
import { CatalogoProps } from "../types/compras.types";
import Botones from "./Botones";
import Cumplimiento from "./Cumplimiento";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import usePagina from "../hooks/usePagina";

const Catalogo: FunctionComponent<CatalogoProps> = ({
  comprarPublicacion,
  setCarrito,
  carritoCargando,
  articuloSeleccionado,
  dict,
  gastosAprobados,
  aprobarCargando,
  aprobarGastos,
  setCumplimiento,
  catalogo,
  carrito,
  cumplimiento,
  datosOraculos,
  setArticuloSeleccionado,
  setVerImagen,
}): JSX.Element => {
  const { bookRef } = usePagina(catalogo);
  return (
    <div
      className="relative w-full items-start justify-start flex flex-col gap-3 h-fit p-2"
      id="padre"
    >
      <div className="relative w-full h-fit flex items-start justify-start text-white font-con text-sm">
        {dict.Home.npcStudio}
      </div>
      <div className="relative w-full h-fit flex items-center justify-between text-white font-con text-sm flex-row">
        <div className="relative w-full h-fit text-left flex items-center justify-start text-white font-bit text-sm">
          {dict.Home.todoElCatalogo}
        </div>
        <div className="relative w-full h-fit text-right flex items-center justify-end text-white font-bit text-xs">
          {dict.Home.muestra}
        </div>
      </div>
      <div
        className="relative w-full flex items-center justify-center pb-6"
        ref={bookRef}
        style={{ height: "320px" }}
      >
        {catalogo?.paginas?.map((pagina: string, indice: number) => (
          <div
            key={indice}
            className="page relative flex items-center justify-center"
          >
            <Image
              src={`${INFURA_GATEWAY}/ipfs/${pagina.split("ipfs://")[1]}`}
              layout="fill"
              objectFit="contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <div className="relative w-full h-fit tab:flex-nowrap flex-wrap tab:h-[12rem] flex flex-row gap-4 items-start justify-between">
        <Cumplimiento
          setCumplimiento={setCumplimiento}
          cumplimiento={cumplimiento}
          dict={dict}
        />
        <Botones
          minteado={catalogo?.minteado || 0}
          cantidad={catalogo?.cantidad}
          precio={catalogo?.precio}
          datosOraculos={datosOraculos}
          setCarrito={setCarrito}
          setArticuloSeleccionado={setArticuloSeleccionado}
          comprarPublicacion={comprarPublicacion}
          carritoCargando={carritoCargando}
          articulo={articuloSeleccionado[0]}
          indice={0}
          dict={dict}
          gastosAprobados={gastosAprobados[0]}
          agotado={
            Number(catalogo?.minteado) +
              carrito?.compras
                ?.filter(
                  (el) =>
                    JSON.stringify(el.elemento) == JSON.stringify(catalogo)
                )
                ?.reduce((sum, el) => sum + el.cantidad, 0) >=
            catalogo?.cantidad
          }
          aprobarCargando={aprobarCargando}
          aprobarGastos={aprobarGastos}
        />
      </div>
    </div>
  );
};

export default Catalogo;
