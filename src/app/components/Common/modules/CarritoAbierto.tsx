"use client";
import Image from "next/legacy/image";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineLoading } from "react-icons/ai";
import { FunctionComponent, JSX, useContext } from "react";
import { ModalContext } from "@/app/providers";
import { ACCEPTED_TOKENS, INFURA_GATEWAY } from "@/app/lib/constants";
import {
  AutographType,
  CarritoAbiertoProps,
  Catalogo,
  Coleccion,
} from "../types/common.types";
import Cumplimiento from "./Cumplimiento";
import useCompras from "../hooks/useCompras";

const CarritoAbierto: FunctionComponent<CarritoAbiertoProps> = ({
  dict,
  carritoCargando,
  aprobarCargando,
  setAprobarCargando,
  setCarritoCargando,
}): JSX.Element => {
  const {
    comprarCarrito,
    setCumplimiento,
    aprobarGastos,
    cumplimiento,
    gastosAprobados,
  } = useCompras(dict, setAprobarCargando, setCarritoCargando);

  const getRandomPhrases = () => {
    const random = Math.random() < 0.5;
    return random
      ? [dict.Home.frase1, dict.Home.frase2]
      : [dict.Home.frase3, dict.Home.frase4];
  };

  const element = document.getElementById("teclas");

  if (element) {
    const [firstPhrase, secondPhrase] = getRandomPhrases();
    const devTypeText = `${firstPhrase} ${secondPhrase}`;
    let i = 0;
    let isTag = false;
    let text = "";

    (function type() {
      text = devTypeText.slice(0, ++i);
      element.innerHTML = `<span style='color: yellow; word-break: break-word;'>${text}</span><span class='blinker'>&#32;</span>`;
      const char = text.slice(-1);
      if (char === "<") isTag = true;
      if (char === ">") isTag = false;
      if (!isTag && text !== devTypeText) setTimeout(type, 60);
    })();
  }

  const contexto = useContext(ModalContext);

  return (
    <div className="relative w-full items-start justify-start flex flex-col gap-10 tab:h-full h-fit p-2 text-rosa font-bit">
      <div className="relative w-full h-fit flex items-start justify-start text-rosa font-con text-sm">
        {dict.Home.npcStudio}
      </div>
      <div
        className={`relative w-full flex justify-between flex-row gap-12 xl:flex-nowrap flex-wrap ${
          Number(contexto?.carrito.compras?.length) < 1
            ? "items-end h-full"
            : "items-start h-fit xl:h-full"
        }`}
      >
        <div className="relative w-full h-fit xl:h-full flex items-start justify-start xl:max-w-[50%]">
          <div className="relative w-fit h-fit overflow-x-scroll flex items-start justify-start gap-4 flex-row">
            {Number(contexto?.carrito.compras?.length) < 1 ? (
              <div className="flex flex-col gap-2 flex items-center justify-center text-center relative w-full h-full text-xs">
                {dict.Home.nada}
              </div>
            ) : (
              contexto?.carrito.compras?.map((elemento, indice: number) => {
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
                            (elemento.elemento as Coleccion)?.imagenes?.[0]
                              ? (
                                  elemento.elemento as Coleccion
                                ).imagenes?.[0]?.split("ipfs://")?.[1]
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
                          ((elemento?.elemento as Catalogo)?.precio *
                            Number(elemento?.cantidad)) /
                          Number(
                            contexto?.oraculos?.find(
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
                      className="relative rounded-full w-fit h-fit border border-white bg-black cursor-pointer opacity-80"
                      onClick={(e) => {
                        e.stopPropagation();
                        contexto?.setCarrito((prev) => ({
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
          {(contexto?.carrito?.compras || [])?.filter(
            (it) => it.tipo !== AutographType.NFT
          )?.length > 0 && (
            <Cumplimiento
              cumplimiento={cumplimiento}
              setCumplimiento={setCumplimiento}
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
                    ACCEPTED_TOKENS.find(
                      (i) => i[2]?.toLowerCase() == tok.token?.toLowerCase()
                    )?.[0]!,
                    "",
                    tok.token?.toLowerCase(),
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
                            (contexto?.carrito.compras || []).filter(
                              (el) =>
                                el.token?.toLowerCase() ==
                                token[2]?.toLowerCase()
                            )?.[0]?.token,
                            (contexto?.carrito.compras || [])
                              .filter(
                                (el) =>
                                  el.token?.toLowerCase() ==
                                  token[2]?.toLowerCase()
                              )
                              ?.reduce(
                                (sum, el) =>
                                  sum +
                                  Number((el.elemento as Catalogo).precio) *
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
                Number(contexto?.carrito?.compras?.length) > 0 &&
                gastosAprobados.every((i) => i?.aprobado == true) &&
                "cursor-pointer active:scale-95"
              }`}
              onClick={() =>
                Number(contexto?.carrito?.compras?.length) > 0 &&
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
      <div
        className="relative w-full h-fit flex items-end justify-end text-xs text-left break-words pt-5 break-worder whitespace-preline"
        id="teclas"
      ></div>
    </div>
  );
};

export default CarritoAbierto;
