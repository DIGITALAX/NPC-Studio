"use client";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS_AMOY, INFURA_GATEWAY } from "@/lib/constants";
import { CarritoAbiertoProps } from "../types/common.types";
import Cumplimiento from "@/components/compras/modules/Cumplimiento";
import { Coleccion } from "@/components/game/types/game.types";
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
  console.log({gastosAprobados})
  return (
    <div
      className="inset-0 justify-center fixed z-30 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!aprobarCargando && !carritoCargando) {
          setCarrito((prev) => ({
            ...prev,
            abierto: false,
          }));
        }
      }}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-black border border-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] sm:w-[45vw] xl:w-[40vw] h-fit max-h-[90vh] min-h-[40vh] xl:min-h-[60vh]  items-center justify-center">
          <div
            className={`relative w-full h-full bg-black/80 flex flex-col items-center py-10 px-4 gap-5 text-white font-vcr justify-start`}
          >
            <Cumplimiento
              setCumplimiento={setCumplimiento}
              cumplimiento={cumplimiento}
              dict={dict}
            />
            <div className="relative w-full h-full flex items-start justify-start">
              <div className="relative w-fit h-fit overflow-x-scroll flex items-start justify-start gap-4 flex-row">
                {carrito.compras?.map((elemento, indice: number) => {
                  return (
                    <div
                      key={indice}
                      className="flex flex-col gap-1 glex items-center justify-center relative w-fit h-fit"
                    >
                      <div
                        className="absolute rounded-full w-fit h-fit border border-white bg-black cursor-pointer hover:opacity-80 -top-2 z-10 -right-1.5"
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
                          <RxCrossCircled color="white" size={25} />
                        </div>
                      </div>
                      <div className="relative w-fit h-fit flex items-center justify-center">
                        {elemento?.cantidad}
                      </div>
                      <div className="relative w-60 h-40 rounded-sm flex items-center justify-center">
                        <Image
                          layout="fill"
                          draggable={false}
                          objectFit="cover"
                          src={`${INFURA_GATEWAY}/ipfs/${
                            (elemento.elemento as Coleccion)?.imagen
                              ? (elemento.elemento as Coleccion).imagen?.split(
                                  "ipfs://"
                                )?.[1]
                              : (elemento.elemento as Catalogo)?.paginas
                              ? (
                                  elemento.elemento as Catalogo
                                )?.paginas[0]?.split("ipfs://")?.[1]
                              : "QmbNPRomMwXfAd6m7eseA48DhfizuGVKCvMBViQLe9BsLs"
                          }`}
                        />
                      </div>
                      <div className="relative w-fit h-fit flex items-center justify-center">
                        {`${Number(
                          (
                            ((Number((elemento?.elemento as Catalogo)?.precio) >
                            0
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
                          ACCEPTED_TOKENS_AMOY?.find(
                            (moneda) =>
                              moneda[2]?.toLowerCase() ===
                              elemento?.token?.toLowerCase()
                          )?.[1]
                        }`}
                      </div>
                      {elemento?.color?.trim() !== "" &&
                        elemento?.tamano?.trim() !== "" && (
                          <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-1 text-vcr text-white">
                            <div className="relative w-fit h-fit flex items-center justify-center rounded-full border-white bg-black">
                              {elemento?.cantidad}
                            </div>
                            <div className="relative w-fit h-fit flex items-center justify-center rounded-full border-white bg-black">
                              {elemento?.cantidad}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative w-full h-fit flex flex-col gap-1 items-center justify-center">
              <div className="relative w-full h-fit flex items-center justify-center">
                {dict.Home.aprobar}
              </div>
              <div className="relative w-full h-fit flex flex-row gap-1 items-center justify-center">
                {gastosAprobados
                  .map((tok) => [
                    ACCEPTED_TOKENS_AMOY.find((i) => i[2] == tok.token)?.[0]!,
                    "",
                    tok.token,
                  ])
                  .map((token: string[], indice: number) => {
                    return (
                      <div
                        className={`relative w-fit h-fit rounded-full flex items-center ${
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
                            )[0].token,
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
                          width={30}
                          height={35}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              className={`relative w-20 h-8 flex items-center justify-center ${
                gastosAprobados.every((i) => i?.aprobado == true)
                  ? "cursor-pointer active:scale-95"
                  : "opacity-50"
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
                dict.Home.pubCompra
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarritoAbierto;
