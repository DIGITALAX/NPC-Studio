import { useContext, useEffect, useState } from "react";
import {
  checkAndSignAuthMessage,
  LitNodeClient,
  uint8arrayToString,
} from "@lit-protocol/lit-node-client";
import { EncryptedDetails, Pedido, SubOrder } from "../types/orders.types";
import { INFURA_GATEWAY, numberToAutograph } from "@/app/lib/constants";
import {
  AutographType,
  Catalogo,
  Coleccion,
} from "../../Common/types/common.types";
import { ModalContext } from "@/app/providers";
import { LIT_NETWORK } from "@lit-protocol/constants";
import { getPedidos } from "../../../../../graphql/queries/getPedidos";

const usePedidos = (address: `0x${string}` | undefined) => {
  const contexto = useContext(ModalContext);
  const [pedidosCargando, setPedidosCargando] = useState<boolean>(false);
  const [descifrarCargando, setDescifrarCargando] = useState<boolean[]>([]);
  const [todosLosPedidos, setTodosLosPedidos] = useState<Pedido[]>([]);
  const [pedidoAbierto, setPedidoAbierto] = useState<boolean[]>([]);
  const client = new LitNodeClient({
    litNetwork: LIT_NETWORK.DatilDev,
    debug: false,
  });

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
      let nonce = await client.getLatestBlockhash();

      const authSig = await checkAndSignAuthMessage({
        chain: "polygon",
        nonce,
      });

      await client.connect();
      const { decryptedData } = await client.decrypt({
        dataToEncryptHash: (
          todosLosPedidos[indice]?.fulfillment as EncryptedDetails
        ).dataToEncryptHash,
        accessControlConditions: (
          todosLosPedidos[indice]?.fulfillment as EncryptedDetails
        ).accessControlConditions,
        chain:
          (todosLosPedidos[indice]?.fulfillment as EncryptedDetails).chain ||
          "polygon",
        ciphertext: (todosLosPedidos[indice]?.fulfillment as EncryptedDetails)
          .ciphertext,
        authSig,
      });

      const fulfillment = await JSON.parse(uint8arrayToString(decryptedData));

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
                Number(elemento.id) === Number(subOrder.collectionId) &&
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
      const datos = await getPedidos(
        address!,
        contexto?.lensConectado?.profile?.address ?? address
      );


      const pedidos = await Promise.all(
        datos?.data?.orderCreateds.map(async (pedido: any, i: number) => {
          let subOrders: SubOrder[] = [];

          await Promise.all(
            pedido?.subOrders?.map(async (sub: any) => {
              if (
                numberToAutograph[Number(sub?.autographType)] ==
                AutographType.Catalog
              ) {
                subOrders.push({
                  amount: Number(sub?.amount),
                  currency: sub?.currency,
                  mintedTokenIds: sub?.mintedTokenIds,
                  fulfiller: sub?.fulfiller,
                  designer: sub?.designer,
                  fulfillerAmount: Number(sub?.fulfillerAmount),
                  designerAmount: Number(sub?.designerAmount),
                  total: Number(sub?.total) / 10 ** 18,
                  collectionId: Number(sub?.collectionId),
                  autographType: AutographType.Catalog,
                  collection: {
                    paginas: sub?.catalog?.pages,
                    precio: sub?.catalog?.price,
                    cantidad: sub?.catalog?.amount,
                    minteado: sub?.catalog?.mintedTokens,
                    tipo: AutographType.Catalog,
                  } as Catalogo,
                });
              } else {
                let col = sub?.collection;

                if (col && !col?.metadata) {
                  const res = await fetch(
                    `${INFURA_GATEWAY}/ipfs/${col?.uri?.split("ipfs://")?.[1]}`
                  );
                  let metadata = await res.json();
                  col = {
                    ...col,
                    metadata,
                  };
                }

                subOrders.push({
                  amount: Number(sub?.amount),
                  currency: sub?.currency,
                  mintedTokenIds: sub?.mintedTokenIds,
                  fulfiller: sub?.fulfiller,
                  designer: sub?.designer,
                  fulfillerAmount: Number(sub?.fulfillerAmount),
                  designerAmount: Number(sub?.designerAmount),
                  total: Number(sub?.total) / 10 ** 18,
                  collectionId: Number(sub?.collectionId),
                  autographType: numberToAutograph[Number(sub.autographType)],
                  collection: {
                    tokenesMinteados: col.mintedTokenIds,
                    precio: Number(col.price),
                    tipo: numberToAutograph[Number(col.type)],
                    imagenes: col.metadata?.images,
                    coleccionId: col.collectionId,
                  } as Coleccion,
                });
              }
            })
          );

          return {
            ...pedido,
            total: pedido?.total / 10 ** 18,
            subOrders,
            fulfillment: pedido?.fulfillment && JSON.parse(pedido?.fulfillment),
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
    if (todosLosPedidos?.length < 1 && contexto?.pantalla == 2 && address) {
      cogerPedidos();
    }
  }, [contexto?.pantalla, address]);

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
