"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { SeguirProps } from "../types/common.types";
import moment from "moment";
import { AiOutlineLoading } from "react-icons/ai";

function Seguir({
  dict,
  seguirColeccionar,
  setSeguirColeccionar,
  aprobar,
  cargandoColeccion,
  aprobado,
  manejarColeccionar,
}: SeguirProps) {
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setSeguirColeccionar(undefined)}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-oscuro border border-white rounded-md cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] max-w-[64rem] h-[calc(100vw*(40/64))] max-h-[40rem] flex items-center justify-center">
          <Image
            draggable={false}
            layout="fill"
            objectFit="cover"
            src={`${INFURA_GATEWAY}/ipfs/QmUsrPxWX5wcnmVGt5WykDgTNDM3KHsjSrMZSxZui5u4rC`}
          />
          <div
            className={`flex flex-col items-center py-2 sm:py-10 px-2 sm:px-4 gap-5 text-white font-bit relative w-[75%] h-[65%] items-start justify-center flex overflow-y-scroll`}
          >
            <div className="relative w-full items-center justify-start flex flex-col gap-6 h-fit">
              <div
                className={`relative rounded-md flex flex-col gap-5 w-5/6 p-2 items-center justify-center w-full h-fit font-aust text-white text-sm`}
              >
                <div className="relative w-fit h-fit flex items-center justify-center">
                  {dict.Home.red}
                </div>
                <div className="relative w-3/4 xl:w-1/2 items-center justify-center rounded-md border border-white h-60 flex">
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/QmQf3pEG3AXMn5xqRN8Kd8eAC7pEvFoCKvXoycZDpB44Km`}
                    objectFit="cover"
                    layout="fill"
                    className="rounded-md"
                    draggable={false}
                  />
                </div>
                {seguirColeccionar?.collecionar?.item?.endsAt && (
                  <div className="relative w-fit h-fit flex items-center justify-center font-bit break-words px-2 text-center">
                    {seguirColeccionar?.collecionar?.item?.endsAt < Date.now()
                      ? dict.Home.over
                      : `${dict.Home.fin} ${
                          moment
                            .duration(
                              moment(
                                seguirColeccionar?.collecionar?.item?.endsAt
                              ).diff(moment())
                            )
                            .asMilliseconds() > 0
                            ? `${moment
                                .utc(
                                  moment(
                                    seguirColeccionar?.collecionar?.item?.endsAt
                                  ).diff(moment())
                                )
                                .format("H [hrs]")} and ${moment
                                .utc(
                                  moment(
                                    seguirColeccionar?.collecionar?.item?.endsAt
                                  ).diff(moment())
                                )
                                .format("m [min]")}`
                            : dict.Home.hr
                        }`}
                  </div>
                )}
                {Number(seguirColeccionar?.collecionar?.item?.collectLimit) >
                  0 && (
                  <div className="relative w-fit h-fit flex items-center justify-center font-bit text-base text-center">
                    {seguirColeccionar?.collecionar?.stats} /{" "}
                    {seguirColeccionar?.collecionar?.item?.collectLimit}
                  </div>
                )}
                {seguirColeccionar?.collecionar?.item?.amount &&
                  Number(seguirColeccionar?.collecionar?.item?.amount?.value) >
                    0 && (
                    <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-2 font-bit text-base text-sol">
                      <div className="relative w-fit h-fit flex items-center justify-center">
                        {seguirColeccionar?.collecionar?.item?.amount?.value}
                      </div>
                      <div className="relative w-fit h-fit flex items-center justify-center">
                        {
                          seguirColeccionar?.collecionar?.item?.amount?.asset
                            ?.symbol
                        }
                      </div>
                    </div>
                  )}
              </div>
              <div
                className={`relative w-28 h-8 py-1 px-2 border border-white rounded-md font-aust text-white bg-black flex items-center justify-center text-xs ${
                  !cargandoColeccion && "cursor-pointer active:scale-95"
                }`}
                onClick={() =>
                  !cargandoColeccion &&
                  (!aprobado ? aprobar() : manejarColeccionar())
                }
              >
                <div
                  className={`relative w-fit h-fit flex items-center justify-center ${
                    cargandoColeccion && "animate-spin"
                  }`}
                >
                  {cargandoColeccion ? (
                    <AiOutlineLoading size={15} color={"white"} />
                  ) : !aprobado ? (
                    dict.Home.aprobar
                  ) : Number(
                      seguirColeccionar?.collecionar?.item?.collectLimit
                    ) == Number(seguirColeccionar?.collecionar?.stats) ? (
                    dict.Home.agotado
                  ) : (
                    dict.Home.col
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seguir;
