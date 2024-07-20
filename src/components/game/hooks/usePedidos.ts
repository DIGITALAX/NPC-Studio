import { useEffect, useState } from "react";
import {
  AutographType,
  Coleccion,
  EncryptedDetails,
  Pedido,
} from "../types/game.types";
import { getPedidos } from "../../../../graphql/autograph/queries/getPedidos";
import { INFURA_GATEWAY, numberToAutograph } from "@/lib/constants";
import {
  LitNodeClient,
  checkAndSignAuthMessage,
  decryptToString,
} from "@lit-protocol/lit-node-client";
import { getColeccion } from "../../../../graphql/autograph/queries/getColeccion";
import { getCatalogo } from "../../../../graphql/autograph/queries/getCatalogo";

const usePedidos = (
  pantalla: number,
  address: `0x${string}` | undefined,
  cliente: LitNodeClient
) => {
  const [pedidosCargando, setPedidosCargando] = useState<boolean>(false);
  const [descifrarCargando, setDescifrarCargando] = useState<boolean[]>([]);
  const [todosLosPedidos, setTodosLosPedidos] = useState<Pedido[]>([]);
  const [pedidoAbierto, setPedidoAbierto] = useState<boolean[]>([]);

  const manejarDescifrar = async (indice: number) => {
    if (
      !(todosLosPedidos[indice]?.fulfillment as EncryptedDetails)?.ciphertext ||
      !(todosLosPedidos[indice]?.fulfillment as EncryptedDetails)
        ?.dataToEncryptHash ||
      !address ||
      todosLosPedidos[indice]?.decrypted
    ) {
      return;
    }

    setDescifrarCargando((prev) => {
      const arr = [...prev];
      arr[indice] = true;
      return arr;
    });
    try {
      let nonce = await cliente.getLatestBlockhash();

      const authSig = await checkAndSignAuthMessage({
        chain: "mumbai",
        nonce,
      });

      await cliente.connect();

      const decryptedString = await decryptToString(
        {
          authSig,
          accessControlConditions: (
            todosLosPedidos[indice]?.fulfillment as EncryptedDetails
          ).accessControlConditions,
          ciphertext: (todosLosPedidos[indice]?.fulfillment as EncryptedDetails)
            .ciphertext,
          dataToEncryptHash: (
            todosLosPedidos[indice]?.fulfillment as EncryptedDetails
          ).dataToEncryptHash,
          chain: "polygon",
        },
        cliente
      );

      const fulfillment = await JSON.parse(decryptedString);

      setTodosLosPedidos((prev) => {
        const pedidos = [...prev];
        pedidos[indice] = {
          ...pedidos[indice],
          fulfillment,
          subOrders: pedidos[indice]?.subOrders.map((subOrder) => {
            const matchingElemento = fulfillment?.elementos.find(
              (elemento: any) =>
                elemento.moneda?.toLowerCase() ===
                  subOrder.currency?.toLowerCase() &&
                  elemento.tipo === subOrder.type &&
                Number(elemento.id) === Number(subOrder.id) &&
                Number(elemento.cantidad) === Number(subOrder.amount)
            );

            return {
              ...subOrder,
              color: matchingElemento?.color,
              tamano: matchingElemento?.tamano,
            };
          }),
          decrypted: true,
        };
        return pedidos;
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setDescifrarCargando((prev) => {
      const arr = [...prev];
      arr[indice] = false;
      return arr;
    });
  };

  const cogerPedidos = async () => {
    setPedidosCargando(true);
    try {
      const datos = await getPedidos(address!);

      const pedidos = await Promise.all(
        datos?.data?.orderCreateds.map(async (pedido: any, i: number) => {
          let jsonArray = await JSON.parse(pedido.collectionIds);
          let collectionIds: number[][] = [];
          for (let i = 0; i < jsonArray.length; i++) {
            let subArray = jsonArray[i];
            let subResult = [];
            for (let j = 0; j < subArray.length; j++) {
              subResult.push(Number(subArray[j]));
            }
            collectionIds.push(subResult);
          }

          jsonArray = await JSON.parse(pedido.mintedTokens);

          let mintedTokens: number[][] = [];
          for (let i = 0; i < jsonArray.length; i++) {
            let subArray = jsonArray[i];
            let subResult = [];
            for (let j = 0; j < subArray.length; j++) {
              subResult.push(Number(subArray[j]));
            }
            mintedTokens.push(subResult);
          }

          let subOrders: {
            images: string[];
            color?: string;
            tamano?: string;
            type: string;
            amount: number;
            subTotal: number;
            currency: string;
            id: number;
          }[] = [];

          await Promise.all(
            collectionIds?.map(async (col: number[], indice) => {
              if (
                numberToAutograph[Number(pedido.subOrderTypes?.[indice])] ==
                AutographType.Catalog
              ) {
                const datos = await getCatalogo();
                subOrders.push({
                  images: [datos?.data?.autographCreateds[0].pages?.[0]],
                  amount: pedido.amounts?.[indice],
                  subTotal: Number(pedido.subTotals?.[indice]) / 10 ** 18,
                  currency: pedido.currencies?.[indice],
                  type: numberToAutograph[
                    Number(pedido.subOrderTypes?.[indice])
                  ],
                  id: collectionIds[indice]?.[0],
                });
              } else {
                let images: string[] = [];
                await Promise.all(
                  col.map(async (el) => {
                    const datos = await getColeccion(el);
                    await Promise.all(
                      datos?.data?.collections.map(async (col: any) => {
                        if (!col.collectionMetadata) {
                          const cadena = await fetch(
                            `${INFURA_GATEWAY}/ipfs/${
                              col.uri.split("ipfs://")?.[1]
                            }`
                          );
                          col.collectionMetadata = await cadena.json();
                        }

                        images.push(col.collectionMetadata?.image);
                      })
                    );
                  })
                );

                subOrders.push({
                  images,
                  amount: pedido.amounts?.[indice],
                  subTotal: Number(pedido.subTotals?.[indice]) / 10 ** 18,
                  currency: pedido.currencies?.[indice],
                  type: numberToAutograph[
                    Number(pedido.subOrderTypes?.[indice])
                  ],
                  id: collectionIds[indice]?.[0],
                });
              }
            })
          );

          return {
            ...pedido,
            collectionIds,
            mintedTokens,
            subOrders,
            fulfillment: JSON.parse(pedido?.fulfillment),
            decrypted: false,
          };
        })
      );
      setTodosLosPedidos(pedidos);
      setDescifrarCargando(Array.from({ length: pedidos.length }, () => false));
      setPedidoAbierto(Array.from({ length: pedidos.length }, () => false));
    } catch (err: any) {
      console.error(err.message);
    }
    setPedidosCargando(false);
  };

  useEffect(() => {
    if (todosLosPedidos?.length < 1 && pantalla == 2 && address) {
      cogerPedidos();
    }
  }, [pantalla, address]);


  return {
    pedidosCargando,
    descifrarCargando,
    manejarDescifrar,
    todosLosPedidos,
    setPedidoAbierto,
    pedidoAbierto,
  };
};

export default usePedidos;
