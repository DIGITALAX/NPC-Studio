import { FunctionComponent } from "react";
import { BotonesProps, Catalogo, Mezcla } from "../types/compras.types";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";

const Botones: FunctionComponent<BotonesProps> = ({
  setCarrito,
  comprarPublicacion,
  carritoCargando,
  articulo,
  dict,
  aprobarCargando,
  aprobarGastos,
  gastosAprobados,
  agotado,
  indice,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex items-end justify-end flex-row gap-3 font-vcr text-black text-xs bottom-0">
      {comprarPublicacion && (
        <div
          className={`relative w-20 h-8 flex items-center justify-center ${
            !agotado && "cursor-pointer active:scale-95"
          }`}
          onClick={() =>
            !carritoCargando &&
            !aprobarCargando &&
            !agotado &&
            (gastosAprobados?.aprobado
              ? comprarPublicacion(articulo)
              : aprobarGastos(
                  articulo.token,
                  Number(
                    ((articulo.elemento as Mezcla).maximo
                      ? (articulo.elemento as Mezcla).maximo
                      : (articulo.elemento as Catalogo).precio) *
                      articulo.cantidad
                  ),
                  indice
                ))
          }
        >
          {carritoCargando || aprobarCargando ? (
            <div className="relative animate-spin flex items-center justify-center">
              <AiOutlineLoading color="white" size={15} />
            </div>
          ) : agotado ? (
            dict.Home.agotado
          ) : gastosAprobados?.aprobado ? (
            dict.Home.pubCompra
          ) : (
            dict.Home.aprobar
          )}
        </div>
      )}
      <div
        className={`relative w-10 h-10 flex items-center justify-center cursor-pointer active:scale-95  ${
          !agotado && "cursor-pointer active:scale-95"
        }`}
        title={dict.Home.addCart}
        onClick={() =>
          !agotado &&
          setCarrito((prev) => {
            let compras = prev.compras;

            const el = prev.compras.find(
              (el) =>
                el.elemento == articulo.elemento &&
                el.token == articulo.token &&
                el.tamano == articulo.tamano &&
                el.color == articulo.color
            );

            if (el) {
              compras = prev.compras.map((el) =>
                el.elemento == articulo.elemento
                  ? {
                      ...el,
                      cantidad: el.cantidad + 1,
                    }
                  : el
              );
            } else {
              compras = [...prev.compras, articulo];
            }

            return {
              ...prev,
              compras,
            };
          })
        }
      >
        <Image
          src={`${INFURA_GATEWAY}/ipfs/QmT5ewiqFhfo8EHxSYiFwFR67pBpg7xesdtwAu9oWBoqqu`}
          layout="fill"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Botones;
