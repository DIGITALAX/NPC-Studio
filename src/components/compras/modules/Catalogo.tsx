import { FunctionComponent } from "react";
import {
  Catalogo as CatalogoTipo,
  CatalogoProps,
} from "../types/compras.types";
import Botones from "./Botones";
import Cumplimiento from "./Cumplimiento";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS_AMOY, INFURA_GATEWAY } from "@/lib/constants";

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
}): JSX.Element => {
  return (
    <div className="relative w-full items-center justify-start flex flex-col gap-3">
      <Cumplimiento
        setCumplimiento={setCumplimiento}
        cumplimiento={cumplimiento}
        dict={dict}
      />
      <div className="relative w-full items-center justify-start flex flex-col gap-3">
        <div className="relative w-full h-60 flex items-center justify-center">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/${
              catalogo?.paginas?.[pagina]?.split("ipfs://")[1]
            }`}
            layout="fill"
            objectFit="cover"
            draggable={false}
          />
        </div>
        <div className="relative w-fit h-fit flex flex-row items-center justify-center">
          <div className="relative w-fit h-fit flex items-center justify-center">
            {catalogo?.minteado} / {catalogo?.cantidad}
          </div>
          <div className="relative w-fit h-fit flex flex-col items-center justify-center">
            <div className="relative w-fit justify-center items-center flex flex-row gap-1">
              {ACCEPTED_TOKENS_AMOY.filter((moneda) =>
                (articuloSeleccionado?.[0]?.elemento as CatalogoTipo)?.tokenes
                  ?.map((i) => i.toLowerCase())
                  ?.includes(moneda[2]?.toLowerCase())
              )?.map((moneda: string[], indice: number) => {
                return (
                  <div
                    className={`relative w-fit h-fit rounded-full flex items-center cursor-pointer active:scale-95 ${
                      articuloSeleccionado?.[0]?.token === moneda[2]
                        ? "opacity-50"
                        : "opacity-100"
                    }`}
                    key={indice}
                    onClick={() =>
                      setArticuloSeleccionado((prev) => {
                        const arr = [...prev];

                        arr[0] = {
                          ...arr[0],
                          token: moneda[2],
                        };

                        return arr;
                      })
                    }
                  >
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/${moneda[0]}`}
                      className="flex rounded-full"
                      draggable={false}
                      width={30}
                      height={35}
                    />
                  </div>
                );
              })}
            </div>
            <div className="relative w-fit h-fit flex items-center justify-center">
              {`${Number(
                (
                  catalogo?.precio /
                  Number(
                    datosOraculos?.find(
                      (oraculo) =>
                        oraculo.currency?.toLowerCase() ===
                        articuloSeleccionado[0]?.token?.toLowerCase()
                    )?.rate
                  )
                )?.toFixed(3)
              )} ${
                ACCEPTED_TOKENS_AMOY?.find(
                  (moneda) =>
                    moneda[2]?.toLowerCase() ===
                    articuloSeleccionado?.[0]?.token?.toLowerCase()
                )?.[1]
              }`}
            </div>
          </div>
        </div>
        <div className="relative w-fit h-fit flex flex-row gap-2 items-center justify-center">
          <div
            className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95 rounded-full bg-black border-white"
            onClick={() =>
              setPagina((prev) =>
                prev > 0 ? prev - 1 : catalogo.paginasContadas - 1
              )
            }
          >
            <FaArrowAltCircleLeft size={20} color="white" />
          </div>
          <div
            className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95 rounded-full bg-black border-white"
            onClick={() =>
              setPagina((prev) =>
                prev < catalogo.paginasContadas - 1 ? prev + 1 : 0
              )
            }
          >
            <FaArrowAltCircleRight size={20} color="white" />
          </div>
        </div>
      </div>
      <Botones
        comprarPublicacion={comprarPublicacion}
        setCarrito={setCarrito}
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
  );
};

export default Catalogo;
