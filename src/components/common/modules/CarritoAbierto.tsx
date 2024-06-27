"use client";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS, INFURA_GATEWAY } from "@/lib/constants";
import { CarritoAbiertoProps } from "../types/common.types";
import Cumplimiento from "@/components/compras/modules/Cumplimiento";
import { AutographType, Coleccion } from "@/components/game/types/game.types";
import { Catalogo, Mezcla } from "@/components/compras/types/compras.types";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineLoading } from "react-icons/ai";

function CarritoAbierto({
  carrito,
  setCarrito,
  comprarCarrito,
  dict,
  cumplimiento,
  setCumplimiento,
  datosOraculos,
  carritoCargando,
  aprobarCargando,
  gastosAprobados,
  aprobarGastos,
}: CarritoAbiertoProps) {
  return (
    <div className="relative w-full items-start justify-start flex flex-col gap-10 tab:h-full h-fit p-2 text-rosa font-bit">
      <div className="relative w-full h-fit flex items-start justify-start text-rosa font-con text-sm">
        {dict.Home.npcStudio}
      </div>
      <div
        className={`relative w-full flex justify-between flex-row gap-12 xl:flex-nowrap flex-wrap ${
          carrito.compras?.length < 1 ? "items-end h-full" : "items-start h-fit xl:h-full"
        }`}
      >
        <div className="relative w-full h-fit xl:h-full flex items-start justify-start xl:max-w-[50%]">
          <div className="relative w-fit h-fit overflow-x-scroll flex items-start justify-start gap-4 flex-row">
            {carrito.compras?.length < 1 ? (
              <div className="flex flex-col gap-2 flex items-center justify-center text-center relative w-full h-full text-xs">
                {dict.Home.nada}
              </div>
            ) : (
              carrito.compras?.map((elemento, indice: number) => {
                return (
                  <div
                    key={indice}
                    className="flex flex-col gap-2 flex items-center justify-center relative w-fit h-fit text-xs"
                  >
                    <div className="relative w-36 h-52 rounded-md flex items-center justify-center p-2 border border-ligero">
                      <div className="relative w-full h-full rounded-md">
                        <Image
                          layout="fill"
                          draggable={false}
                          objectFit="cover"
                          className="rounded-md"
                          src={`${INFURA_GATEWAY}/ipfs/${
                            (elemento.elemento as Coleccion)?.imagen
                              ? (elemento.elemento as Coleccion).imagen?.split(
                                  "ipfs://"
                                )?.[1]
                              : (elemento.elemento as Catalogo)?.paginas
                              ? (
                                  elemento.elemento as Catalogo
                                )?.paginas[0]?.split("ipfs://")?.[1]
                              : "QmegowH3mczqGbK1mkU1XLtntDdHfZEYDTZQCe9yfRhQXB"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      {`${Number(
                        (
                          ((Number((elemento?.elemento as Catalogo)?.precio) > 0
                            ? (elemento?.elemento as Catalogo)?.precio
                            : Number((elemento?.elemento as Mezcla)?.maximo) *
                              10 ** 18) *
                            Number(elemento?.cantidad)) /
                          Number(
                            datosOraculos?.find(
                              (oraculo) =>
                                oraculo.currency?.toLowerCase() ===
                                elemento?.token?.toLowerCase()
                            )?.rate
                          )
                        )?.toFixed(3)
                      )} ${
                        ACCEPTED_TOKENS?.find(
                          (moneda) =>
                            moneda[2]?.toLowerCase() ===
                            elemento?.token?.toLowerCase()
                        )?.[1]
                      }`}
                    </div>
                    <div
                      className="realtive rounded-full w-fit h-fit border border-white bg-black cursor-pointer opacity-80"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCarrito((prev) => ({
                          ...prev,
                          compras: prev.compras.filter(
                            (el) =>
                              JSON.stringify(el) !== JSON.stringify(elemento)
                          ),
                        }));
                      }}
                    >
                      <div
                        className={`relative flex items-center justify-center w-fit h-fit`}
                      >
                        <RxCrossCircled color="white" size={15} />
                      </div>
                    </div>
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      {elemento?.cantidad}
                    </div>
                    {elemento?.color?.trim() !== "" &&
                      elemento?.tamano?.trim() !== "" && (
                        <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-1 text-vcr text-white">
                          <div
                            className="relative w-7 h-7 flex items-center justify-center border-white rounded-full border"
                            style={{
                              backgroundColor: elemento?.color,
                            }}
                          ></div>
                          <div className="relative w-7 h-7 flex items-center justify-center text-xs border rounded-full border-white bg-black">
                            {elemento?.tamano}
                          </div>
                        </div>
                      )}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="relative w-full h-fit flex flex-col gap-5 items-center justify-start">
          {carrito?.compras?.filter((it) => it.tipo !== AutographType.NFT)
            ?.length > 0 && (
            <Cumplimiento
              setCumplimiento={setCumplimiento}
              cumplimiento={cumplimiento}
              dict={dict}
              abierto={true}
            />
          )}
          <div className="relative w-full h-fit flex items-center justify-end flex-col gap-4">
            <div className="relative w-full h-fit flex flex-col gap-1 items-center justify-center">
              <div className="relative w-full h-fit flex items-center justify-center">
                {dict.Home.aprobar}
              </div>
              <div className="relative w-full h-fit flex flex-row gap-2 items-center justify-center">
                {gastosAprobados
                  .map((tok) => [
                    ACCEPTED_TOKENS.find((i) => i[2] == tok.token)?.[0]!,
                    "",
                    tok.token,
                  ])
                  .map((token: string[], indice: number) => {
                    return (
                      <div
                        className={`relative w-6 h-6 rounded-full flex items-center ${
                          !gastosAprobados[indice].aprobado
                            ? "opacity-100 cursor-pointer active:scale-95"
                            : "opacity-50"
                        }`}
                        key={indice}
                        onClick={() =>
                          !gastosAprobados[indice].aprobado &&
                          !aprobarCargando &&
                          aprobarGastos(
                            carrito.compras.filter(
                              (el) => el.token == token[2]
                            )?.[0]?.token,
                            carrito.compras
                              .filter((el) => el.token == token[2])
                              ?.reduce(
                                (sum, el) =>
                                  sum +
                                  Number(
                                    (el.elemento as Mezcla).maximo > 0
                                      ? Number((el.elemento as Mezcla).maximo) *
                                          10 ** 18
                                      : (el.elemento as Catalogo).precio
                                  ) *
                                    Number(el.cantidad),
                                0
                              ),
                            indice
                          )
                        }
                      >
                        <Image
                          src={`${INFURA_GATEWAY}/ipfs/${token[0]}`}
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
            <div
              className={`relative bg-rojo px-1.5 py-1 w-36 h-8 flex items-center border-white border text-xs justify-center ${
                gastosAprobados.every((i) => i?.aprobado == true) &&
                "cursor-pointer active:scale-95"
              }`}
              onClick={() =>
                !carritoCargando &&
                !aprobarCargando &&
                gastosAprobados.every((i) => i?.aprobado == true) &&
                comprarCarrito()
              }
            >
              {carritoCargando || aprobarCargando ? (
                <div className="relative animate-spin flex items-center justify-center">
                  <AiOutlineLoading color="white" size={15} />
                </div>
              ) : (
                dict.Home.carritoCompra
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-fit flex items-end justify-end font-con text-xs tab:text-lg text-left break-words pt-5">
        alguna frase aqui
      </div>
    </div>
  );
}

export default CarritoAbierto;
