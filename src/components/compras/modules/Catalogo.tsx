import { FunctionComponent } from "react";
import { CatalogoProps } from "../types/compras.types";
import Botones from "./Botones";
import Cumplimiento from "./Cumplimiento";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";

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
  pagina,
  setPagina,
  datosOraculos,
  setArticuloSeleccionado,
  setVerImagen,
}): JSX.Element => {
  return (
    <div className="relative w-full items-start justify-start flex flex-col gap-3 h-fit p-2">
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
      <div className="relative w-full h-fit flex items-center justify-center gap-1.5 flex-col">
        <div
          className="relative w-full h-80 flex items-center justify-center rounded-md border border-white bg-black cursor-pointer"
          key={catalogo?.paginas?.[pagina]?.split("ipfs://")[1]}
          onClick={() =>
            setVerImagen({
              abierto: true,
              url: `${INFURA_GATEWAY}/ipfs/${
                catalogo?.paginas?.[pagina]?.split("ipfs://")[1]
              }`,
              tipo: "png",
            })
          }
        >
          <Image
            src={`${INFURA_GATEWAY}/ipfs/${
              catalogo?.paginas?.[pagina]?.split("ipfs://")[1]
            }`}
            layout="fill"
            objectFit="cover"
            draggable={false}
            className="rounded-md"
          />
        </div>
        <div className="relative w-fit h-fit flex flex-row gap-2 items-center justify-center">
          <div
            className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95 rounded-full bg-black border-white"
            onClick={() =>
              setPagina((prev) =>
                prev > 0 ? prev - 1 : catalogo.paginasContadas - 2
              )
            }
          >
            <FaArrowAltCircleLeft size={20} color="white" />
          </div>
          <div
            className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95 rounded-full bg-black border-white"
            onClick={() =>
              setPagina((prev) =>
                prev < catalogo.paginasContadas - 2 ? prev + 1 : 0
              )
            }
          >
            <FaArrowAltCircleRight size={20} color="white" />
          </div>
        </div>
      </div>
      <div className="relative w-full h-[12rem] flex flex-row gap-4 items-start justify-between">
        <Cumplimiento
          setCumplimiento={setCumplimiento}
          cumplimiento={cumplimiento}
          dict={dict}
        />
        <Botones
          minteado={catalogo?.minteado}
          cantidad={catalogo?.cantidad}
          carrito={carrito}
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
              Number(articuloSeleccionado?.[0]?.cantidad) +
              carrito?.compras
                ?.filter(
                  (el) =>
                    JSON.stringify(el.elemento) ==
                    JSON.stringify(articuloSeleccionado?.[0])
                )
                ?.reduce((sum, el) => sum + el.cantidad, 0) >
            articuloSeleccionado?.[0]?.cantidad
          }
          aprobarCargando={aprobarCargando}
          aprobarGastos={aprobarGastos}
        />
      </div>
    </div>
  );
};

export default Catalogo;
