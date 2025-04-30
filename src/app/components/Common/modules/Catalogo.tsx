import { FunctionComponent, JSX, useContext } from "react";
import Cumplimiento from "./Cumplimiento";
import Image from "next/legacy/image";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import usePagina from "../hooks/usePagina";
import Botones from "./Botones";
import { ModalContext } from "@/app/providers";
import { CatalogoProps } from "../types/common.types";
import usePublicacion from "../hooks/usePublicacion";

const Catalogo: FunctionComponent<CatalogoProps> = ({
  articuloSeleccionado,
  dict,
  catalogo,
  setManejarMostrarArticulo,
  setArticuloSeleccionado,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const { bookRef } = usePagina(catalogo);
  const {
    depositFunds,
    depositLoading,
    deposited,
    comprarPublicacion,
    publicacionCargando,
    cumplimiento,
    setCumplimiento,
  } = usePublicacion(dict, setManejarMostrarArticulo, articuloSeleccionado, 0);

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
              src={`${INFURA_GATEWAY_INTERNAL}${pagina.split("ipfs://")[1]}`}
              layout="fill"
              objectFit="contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <div className="relative w-full h-fit tab:flex-nowrap flex-wrap tab:h-[12rem] flex flex-row gap-4 items-start justify-between">
        <Cumplimiento
          cumplimiento={cumplimiento}
          setCumplimiento={setCumplimiento}
          dict={dict}
        />
        <Botones
          depositFunds={depositFunds}
          depositLoading={depositLoading}
          deposited={deposited}
          minteado={catalogo?.minteado || 0}
          cantidad={catalogo?.cantidad}
          precio={catalogo?.precio}
          setArticuloSeleccionado={setArticuloSeleccionado}
          comprarPublicacion={comprarPublicacion}
          carritoCargando={publicacionCargando}
          articulo={articuloSeleccionado[0]}
          indice={0}
          dict={dict}
          agotado={
            Number(catalogo?.minteado) +
              (contexto?.carrito?.compras || [])
                ?.filter(
                  (el) =>
                    JSON.stringify(el.elemento) == JSON.stringify(catalogo)
                )
                ?.reduce((sum, el) => sum + el.cantidad, 0) >=
            catalogo?.cantidad
          }
        />
      </div>
    </div>
  );
};

export default Catalogo;
