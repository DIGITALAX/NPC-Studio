import { FunctionComponent, JSX, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS, INFURA_GATEWAY } from "@/app/lib/constants";
import {
  AutographType,
  BotonesProps,
  Catalogo,
  Coleccion,
} from "../types/common.types";
import { ModalContext } from "@/app/providers";

const Botones: FunctionComponent<BotonesProps> = ({
  comprarPublicacion,
  carritoCargando,
  articulo,
  dict,
  depositFunds,
  depositLoading,
  deposited,
  agotado,
  indice,
  minteado,
  cantidad,
  precio,
  setArticuloSeleccionado,
}): JSX.Element => {
  const contexto = useContext(ModalContext);

  return (
    <div className="relative w-fit h-full flex flex-col items-center justify-between gap-6 font-bit text-white grow">
      <div className="relative w-full h-full flex flex-row items-center justify-start gap-3">
        <div className="relative w-full h-fit flex flex-col items-start justify-start gap-3">
          <div className="relative w-fit h-fit flex items-start justify-start text-xs">
            {minteado} / {cantidad}
          </div>
          <div className="relative w-fit h-fit flex flex-col items-start justify-start">
            <div className="relative w-fit h-fit flex items-start justify-center text-xs sm:text-lg">
              {`${Number(
                (
                  precio /
                  Number(
                    contexto?.oraculos?.find(
                      (oraculo) =>
                        oraculo.currency?.toLowerCase() ===
                        articulo?.token?.toLowerCase()
                    )?.rate
                  )
                )?.toFixed(3)
              )} ${
                ACCEPTED_TOKENS?.find(
                  (moneda) =>
                    moneda[2]?.toLowerCase() === articulo?.token?.toLowerCase()
                )?.[1]
              }`}
            </div>
            <div className="relative w-fit h-fit justify-start items-start flex flex-row gap-1">
              {ACCEPTED_TOKENS.filter((moneda) =>
                (articulo?.elemento as Catalogo)?.tokenes
                  ?.map((i) => i.toLowerCase())
                  ?.includes(moneda[2]?.toLowerCase())
              )?.map((moneda: string[], indiceTwo: number) => {
                return (
                  <div
                    className={`relative w-7 h-7 rounded-full flex items-center cursor-pointer active:scale-95 ${
                      articulo?.token === moneda[2]
                        ? "opacity-50"
                        : "opacity-100"
                    }`}
                    key={indiceTwo}
                    onClick={() =>
                      setArticuloSeleccionado((prev) => {
                        if (
                          ACCEPTED_TOKENS.filter((moneda) =>
                            (articulo?.elemento as Catalogo)?.tokenes
                              ?.map((i) => i.toLowerCase())
                              ?.includes(moneda[2]?.toLowerCase())
                          )?.length == 1
                        )
                          return prev;
                        const arr = [...prev];

                        arr[indice] = {
                          ...arr[indice],
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
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative w-fit h-full flex items-center justify-center">
          <div
            className={`relative bg-black rounded-full h-fit w-fit border border-white flex items-center justify-center ${
              !agotado && "cursor-pointer active:scale-95 hover:opacity-70"
            }`}
            title={dict.Home.addCart}
            onClick={() =>
              !agotado &&
              contexto?.setCarrito((prev) => {
                let compras = prev.compras;

                const el = prev.compras.find(
                  (el) =>
                    el.elemento == articulo?.elemento &&
                    el.token == articulo?.token &&
                    el.tamano == articulo?.tamano &&
                    el.color == articulo?.color
                );

                if (el?.tipo == AutographType.Catalog) {
                  if (
                    Number((el?.elemento as Catalogo)?.minteado || 0) +
                      Number(el?.cantidad || 0) +
                      1 >
                    Number((el?.elemento as Catalogo)?.cantidad)
                  ) {
                    contexto?.setError(dict?.Home?.lim);
                    return prev;
                  }
                } else {
                  if (
                    Number(
                      (el?.elemento as Coleccion)?.tokenesMinteados?.length || 0
                    ) +
                      Number(el?.cantidad || 0) +
                      1 >
                    Number((el?.elemento as Catalogo)?.cantidad)
                  ) {
                    contexto?.setError(dict?.Home?.lim);
                    return prev;
                  }
                }

                if (el) {
                  compras = prev.compras.map((el) =>
                    el.elemento == articulo?.elemento
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
            <div className="relative rounded-full p-2 h-10 w-10  flex items-center justify-center">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/QmeUvktErG1LkwLYRZjU7FqWj9nCXkHcMoy7kpfwTe3WSM`}
                layout="fill"
                objectFit="cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
      {comprarPublicacion &&
        ((articulo?.elemento as Coleccion)?.postIds?.length > 0 ||
          articulo?.tipo == AutographType.Catalog) && (
          <div className="relative w-full h-full flex items-end justify-end">
            <div className="relative w-full h-fit flex items-end justify-end flex-row gap-3 font-bit text-white text-xxs sm:text-xs bottom-0">
              <div
                className={`relative px-1.5 py-1 w-32 h-8 flex items-center border border-white justify-center bg-mar ${
                  !agotado && !deposited
                    ? "cursor-pointer active:scale-95"
                    : "opacity-70"
                }`}
                onClick={() =>
                  !depositLoading &&
                  !agotado &&
                  !carritoCargando &&
                  !deposited &&
                  contexto?.lensConectado?.sessionClient &&
                  depositFunds!()
                }
              >
                {depositLoading ? (
                  <div className="relative animate-spin flex items-center justify-center">
                    <AiOutlineLoading color="white" size={15} />
                  </div>
                ) : (
                  dict.Home.deposit
                )}
              </div>
              <div
                className={`relative bg-rojo px-1.5 py-1 w-32 h-8 flex items-center border-white border justify-center ${
                  !agotado &&
                  deposited &&
                  ((articulo?.elemento as Coleccion)?.postIds?.length > 0 ||
                    articulo?.tipo == AutographType.Catalog)
                    ? "cursor-pointer active:scale-95"
                    : "opacity-70"
                }`}
                onClick={() =>
                  !depositLoading &&
                  !agotado &&
                  !carritoCargando &&
                  ((articulo?.elemento as Coleccion)?.postIds?.length > 0 ||
                    articulo?.tipo == AutographType.Catalog) &&
                  deposited &&
                  contexto?.lensConectado?.sessionClient &&
                  comprarPublicacion(articulo)
                }
              >
                {carritoCargando ? (
                  <div className="relative animate-spin flex items-center justify-center">
                    <AiOutlineLoading color="white" size={15} />
                  </div>
                ) : agotado ? (
                  dict.Home.agotado
                ) : (
                  dict.Home.pubCompra
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Botones;
