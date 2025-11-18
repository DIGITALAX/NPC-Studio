import Image from "next/legacy/image";
import { FunctionComponent } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import useConversacion from "../hooks/useConversacion";
import usePedidos from "../hooks/usePedidos";
import { Details, Pedido, SubOrder } from "../types/orders.types";
import { ACCEPTED_TOKENS, INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import {
  AutographType,
  Catalogo,
  Coleccion,
} from "../../Common/types/common.types";

const ConversacionDynamic = dynamic(() => import("./Conversacion"), {
  ssr: false,
});
const Pedidos: FunctionComponent<{ dict: any }> = ({ dict }) => {
  const { address } = useAccount();
  const {
    enviarMensaje,
    mensajeCargando,
    conversacion,
    conversacionCargando,
    abierta,
    setAbierta,
    setMensaje,
    mensaje,
    mensajeRef,
  } = useConversacion();
  const {
    pedidosCargando,
    descifrarCargando,
    manejarDescifrar,
    todosLosPedidos,
    setPedidoAbierto,
    pedidoAbierto,
  } = usePedidos(address, dict);

  return (
    <div className="relative w-full h-full flex flex-col items-start justify-start overflow-y-scroll bg-black gap-8 p-4">
      <div className="relative w-full h-fit flex items-center justify-end gap-4">
        {!abierta.envio && !abierta.conversacion && (
          <div
            className={`relative bg-rosa px-1.5 py-1 w-32 h-8 flex items-center border-black border text-xs justify-center text-black font-con cursor-pointer active:scale-95`}
            onClick={() =>
              setAbierta((prev) => ({
                ...prev,
                envio: true,
              }))
            }
          >
            {conversacionCargando ? (
              <div className="relative animate-spin flex items-center justify-center">
                <AiOutlineLoading color="black" size={15} />
              </div>
            ) : abierta.envio || abierta.conversacion ? (
              dict.Home.back
            ) : (
              dict.Home.ropa
            )}
          </div>
        )}
        <div
          className={`relative bg-rosa px-1.5 py-1 w-32 h-8 flex items-center border-black border text-xs justify-center text-black font-con ${
            !conversacionCargando
              ? "cursor-pointer active:scale-95"
              : "cursor-default"
          }`}
          onClick={() =>
            setAbierta({
              conversacion:
                !abierta.conversacion && !abierta.envio ? true : false,
              envio: false,
            })
          }
        >
          {conversacionCargando ? (
            <div className="relative animate-spin flex items-center justify-center">
              <AiOutlineLoading color="black" size={15} />
            </div>
          ) : abierta.envio || abierta.conversacion ? (
            dict.Home.back
          ) : (
            dict.Home.mensajes
          )}
        </div>
      </div>
      {abierta?.conversacion ? (
        <ConversacionDynamic
          dict={dict}
          conversacionCargando={conversacionCargando}
          mensaje={mensaje}
          mensajeCargando={mensajeCargando}
          setMensaje={setMensaje}
          conversacion={conversacion}
          enviarMensaje={enviarMensaje}
          mensajeRef={mensajeRef}
          address={address}
        />
      ) : abierta?.envio ? (
        <div className="relative flex flex-col gap-3 text-center items-center justify-start w-full h-full sm:px-0 px-2 font-cont text-white text-sm">
          <div className="relative w-full h-fit flex items-center justify-center break-words text-xl">
            {dict.Home.returns}
          </div>
          <div
            className="relative w-full h-fit items-center justify-center whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{
              __html: dict.Home.faq,
            }}
          ></div>
        </div>
      ) : (
        <div className="relative gap-3 w-full h-fit flex items-start justify-start flex-col">
          {pedidosCargando ? (
            Array.from({ length: 20 }).map((_, indice: number) => {
              return (
                <div
                  className="relative w-full border border-ligero flex flex-col bg-ligero/70 animate-pulse h-28"
                  key={indice}
                ></div>
              );
            })
          ) : todosLosPedidos?.length < 1 ? (
            <div className="relative w-full h-full flex items-center justify-center text-white text-sm font-con break-words">
              <div className="relative w-1/2 h-fit flex items-center justify-center text-center">
                {dict.Home.pedidos}
              </div>
            </div>
          ) : (
            todosLosPedidos?.map((pedido: Pedido, indice: number) => {
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
                            src={`${INFURA_GATEWAY_INTERNAL}QmbTE1oZ1uS5cKDRoD7DBJSsbtHercNCSvvyWA144fgUDz`}
                            className="rounded-md"
                          />
                        </div>
                      </div>
                      <div className="relative w-full h-full flex items-end justify-center text-3xl">
                        USD {Number(pedido.total)}
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
                              `https://explorer.lens.xyz/tx/${pedido.transactionHash}`
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
                      {pedido?.subOrders?.filter(
                        (sub) => sub.autographType !== AutographType.NFT
                      )?.length > 0 && (
                        <div className="relative w-full h-fit flex items-start justify-between gap-4 tab:flex-nowrap flex-wrap">
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
                                !descifrarCargando?.[indice] &&
                                !pedido.decrypted
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
                      )}
                      <div className="relative w-full h-full flex items-start justify-start">
                        <div className="relative w-full h-fit flex items-start justify-start gap-4 flex-col flex-wrap">
                          {pedido.subOrders?.map(
                            (subOrder: SubOrder, indice: number) => {
                              return (
                                <div
                                  key={indice}
                                  className="relative w-full flex items-center justify-between flex-row h-fit gap-4 flex-wrap sm:flex-nowrap"
                                >
                                  <div className="flex relative item-center justify-start whitespace-nowrap break-words">
                                    {subOrder.amount} x {Number(subOrder.total)}
                                  </div>
                                  <div className="relative w-full h-fit flex items-center justify-start flex-row gap-2">
                                    <div className="relative w-8 h-8 rounded-md flex items-center justify-center bg-offNegro border border-ligero">
                                      <Image
                                        src={`${INFURA_GATEWAY_INTERNAL}${
                                          (subOrder?.autographType ==
                                          AutographType.Catalog
                                            ? (subOrder?.collection as Catalogo)
                                                ?.paginas?.[0]
                                            : (
                                                subOrder?.collection as Coleccion
                                              )?.imagenes?.[0]
                                          )?.split("ipfs://")?.[1]
                                        }`}
                                        layout="fill"
                                        className="rounded-md"
                                        draggable={false}
                                        objectFit="cover"
                                      />
                                    </div>
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
                                      ${Number(subOrder.total)}
                                    </div>
                                    <div className="relative flex items-center w-7 h-7 rounded-full  justify-center border border-white">
                                      <Image
                                        src={`${INFURA_GATEWAY_INTERNAL}${
                                          ACCEPTED_TOKENS?.find(
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
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Pedidos;
