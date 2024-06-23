import {
  ACCEPTED_TOKENS_AMOY,
  INFURA_GATEWAY,
  numberToAutograph,
} from "@/lib/constants";
import Image from "next/legacy/image";
import { Pedido, PedidosProps } from "../types/game.types";
import { AiOutlineLoading } from "react-icons/ai";
import { Details } from "@/components/compras/types/compras.types";

function Pedidos({
  todosLosPedidos,
  pedidosCargando,
  manejarDescifrar,
  descifrarCargando,
  pedidoAbierto,
  setPedidoAbierto,
  dict,
}: PedidosProps) {
  return (
    <div className="relative w-full h-full flex items-start justify-start overflow-y-scroll bg-black p-4">
      <div className="relative gap-3 w-full h-fit flex items-start justify-start flex-col">
        {pedidosCargando
          ? Array.from({ length: 20 }).map((_, indice: number) => {
              return (
                <div
                  className="relative w-full border border-ligero flex flex-col bg-ligero/70 animate-pulse h-28"
                  key={indice}
                ></div>
              );
            })
          : todosLosPedidos?.map((pedido: Pedido, indice: number) => {
              return (
                <div
                  className={`relative w-full border border-ligero flex flex-col cursor-pointer text-white text-sm font-con bg-gradient-to-r from-oscuro to-offNegro ${
                    pedidoAbierto?.[indice] ? "h-fit" : "h-fit sm:h-28"
                  }`}
                  key={indice}
                  onClick={() =>
                    setPedidoAbierto((prev) => {
                      const arr = [...prev];
                      arr[indice] = !arr[indice];
                      return arr;
                    })
                  }
                >
                  <div
                    className={`relative w-full flex flex-col sm:flex-row justify-start sm:justify-between item-start sm:items-center gap-4 h-fit sm:h-28 p-2 `}
                  >
                    <div className="relative justify-start items-center w-fit h-full flex flex-row gap-5">
                      <div className="relative w-fit h-full flex items-start justify-between flex-col gap-3">
                        <div className="relative w-fit h-fit flex items-center justify-start break-words whitespace-nowrap">
                          {dict.Home.pedido} {"Id"} {pedido.orderId}
                        </div>
                        <div className="relative w-14 h-14 flex items-center justify-center border border-white rounded-md">
                          <Image
                            layout="fill"
                            objectFit="cover"
                            draggable={false}
                            src={`${INFURA_GATEWAY}/ipfs/QmbTE1oZ1uS5cKDRoD7DBJSsbtHercNCSvvyWA144fgUDz`}
                            className="rounded-md"
                          />
                        </div>
                      </div>
                      <div className="relative w-full h-full flex items-end justify-center text-3xl">
                        USD {Number(pedido.total) / 10 ** 18}
                      </div>
                    </div>
                    <div className="relative w-fit h-full flex items-start sm:items-center justify-start sm:justify-between text-left sm:text-right flex-col gap-3">
                      <div className="relative w-full h-fit flex sm:items-end sm:justify-end break-all items-start justify-start">
                        {pedido.blockTimestamp}
                      </div>
                      <div className="relative w-fit h-fit flex sm:items-end sm:justify-end flex-col gap-1 items-start justify-start">
                        <div className="relative w-fit h-fit flex sm:items-center sm:justify-end break-all items-start justify-start">
                          {dict.Home.tx}
                        </div>
                        <div
                          className="relative w-fit h-fit flex sm:items-center sm:justify-end break-all cursor-pointer text-xs text-ligero items-start justify-start"
                          onClick={() =>
                            window.open(
                              `https://polygonscan.com/tx/${pedido.transactionHash}`
                            )
                          }
                        >
                          {pedido.transactionHash.slice(0, 20)}...
                        </div>
                      </div>
                    </div>
                  </div>
                  {pedidoAbierto?.[indice] && (
                    <div className="relative w-full flex flex-col justify-between items-center gap-10 sm:gap-4 h-fit p-2">
                      <div className="relative h-px w-full bg-white flex"></div>
                      <div className="relative w-full h-fit flex items-start justify-between gap-4 flex-wrap">
                        <div className="relative w-full h-fit flex items-center flex-row gap-3 justify-start flex-wrap">
                          {[
                            {
                              titulo: dict.Home.nombre,
                              valor: pedido.decrypted
                                ? (pedido?.fulfillment as Details)?.nombre
                                : "$%^&*#$%",
                            },
                            {
                              titulo: dict.Home.direccion,
                              valor: pedido.decrypted
                                ? (pedido?.fulfillment as Details)?.direccion
                                : "$%^&*#$%",
                            },
                            {
                              titulo: "zip",
                              valor: pedido.decrypted
                                ? (pedido?.fulfillment as Details)?.zip
                                : "$%^&*#$%",
                            },
                            {
                              titulo: dict.Home.ciudad,
                              valor: pedido.decrypted
                                ? (pedido?.fulfillment as Details)?.ciudad
                                : "$%^&*#$%",
                            },
                            {
                              titulo: dict.Home.estado,
                              valor: pedido.decrypted
                                ? (pedido?.fulfillment as Details)?.estado
                                : "$%^&*#$%",
                            },
                            {
                              titulo: dict.Home.pais,
                              valor: pedido.decrypted
                                ? (pedido?.fulfillment as Details)?.pais
                                : "$%^&*#$%",
                            },
                          ].map(
                            (
                              item: {
                                titulo: string;
                                valor: string;
                              },
                              indice: number
                            ) => {
                              return (
                                <div
                                  className="relative w-fit h-fit flex items-start flex-col justify-center gap-1 text-left font-vcr text-xs"
                                  key={indice}
                                >
                                  <div className="relative w-fit h-fit flex items-center justify-start text-white break-all">
                                    {item.titulo}
                                  </div>
                                  <div className="relative w-fit h-fit flex items-center justify-start text-ligero break-all">
                                    {item.valor}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                        <div className="relative w-fit h-fit flex items-center justify-end">
                          <div
                            className={`relative bg-rojo px-1.5 py-1 w-32 h-8 flex items-center border-white border justify-center ${
                              !descifrarCargando?.[indice] && !pedido.decrypted
                                ? "cursor-pointer active:scale-95"
                                : "cursor-default"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                !descifrarCargando?.[indice] &&
                                !pedido.decrypted
                              ) {
                                manejarDescifrar(indice);
                              }
                            }}
                          >
                            {descifrarCargando?.[indice] ? (
                              <div className="relative animate-spin flex items-center justify-center">
                                <AiOutlineLoading color="white" size={15} />
                              </div>
                            ) : !pedido.decrypted ? (
                              dict.Home.descifrar
                            ) : (
                              dict.Home.descifrado
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full h-full flex items-start justify-start">
                        <div className="relative w-full h-fit flex items-start justify-start gap-4 flex-col flex-wrap">
                          {pedido.subOrders?.map(
                            (
                              subOrder: {
                                images: string[];
                                color?: string;
                                tamano?: string;
                                type: string;
                                amount: number;
                                subTotal: number;
                                currency: string;
                              },
                              indice: number
                            ) => {
                              return (
                                <div
                                  key={indice}
                                  className="relative w-full flex items-center justify-between flex-row h-fit gap-4 flex-wrap sm:flex-nowrap"
                                >
                                  <div className="flex relative item-center justify-start whitespace-nowrap break-words">
                                    {subOrder.amount} x {subOrder.type}
                                  </div>
                                  <div className="relative w-full h-fit flex items-center justify-start flex-row gap-2">
                                    {subOrder?.images?.map(
                                      (im: string, indiceDos: number) => {
                                        return (
                                          <div
                                            key={indiceDos}
                                            className="relative w-8 h-8 rounded-md flex items-center justify-center bg-offNegro border border-ligero"
                                          >
                                            <Image
                                              src={`${INFURA_GATEWAY}/ipfs/${
                                                im?.split("ipfs://")?.[1]
                                              }`}
                                              layout="fill"
                                              className="rounded-md"
                                              draggable={false}
                                              objectFit="cover"
                                            />
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                  {subOrder?.color !== "" &&
                                    subOrder?.tamano !== "" &&
                                    subOrder?.tamano &&
                                    subOrder?.color && (
                                      <div className="relative flex flex-row gap-3 w-fit h-fit justify-center items-center">
                                        <div
                                          className={`relative w-7 h-7 flex items-center justify-center cursor-pointer border border-white rounded-full`}
                                          style={{
                                            backgroundColor: subOrder?.color,
                                          }}
                                        ></div>
                                        <div
                                          className={`relative w-7 h-7 flex items-center justify-center cursor-pointer active:scale-95 text-white font-con text-xs`}
                                        >
                                          {subOrder?.tamano}
                                        </div>
                                      </div>
                                    )}
                                  <div className="relative flex flex-row gap-3 w-fit h-fit justify-end items-center right-0">
                                    <div className="flex relative item-center justify-start w-fit h-fit">
                                      ${subOrder.subTotal}
                                    </div>
                                    <div className="relative flex items-center w-7 h-7 rounded-full  justify-center">
                                      <Image
                                        src={`${INFURA_GATEWAY}/ipfs/${
                                          ACCEPTED_TOKENS_AMOY?.find(
                                            (tok) =>
                                              tok[2].toLocaleLowerCase() ==
                                              subOrder?.currency?.toLowerCase()
                                          )?.[0]
                                        }`}
                                        className="flex rounded-full"
                                        draggable={false}
                                        layout="fill"
                                        objectFit="cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Pedidos;
