import { useEffect, useState } from "react";
import { EncryptedDetails, Pedido } from "../types/game.types";
import { getPedidos } from "../../../../graphql/autograph/queries/getPedidos";
import { INFURA_GATEWAY } from "@/lib/constants";
import {
  LitNodeClient,
  checkAndSignAuthMessage,
  decryptToString,
} from "@lit-protocol/lit-node-client";

const usePedidos = (
  pantalla: number,
  address: `0x${string}` | undefined,
  cliente: LitNodeClient
) => {
  const [pedidosCargando, setPedidosCargando] = useState<boolean>(false);
  const [descifrarCargando, setDescifrarCargando] = useState<boolean[]>([]);
  const [todosLosPedidos, setTodosLosPedidos] = useState<Pedido[]>([]);

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
          subOrderStyles: pedidos[indice]?.subOrderTypes.map((_, indice) => ({
            color: fulfillment.sizes[fulfillment.sizes.length - 1 - indice],
            tamano: fulfillment.colors[fulfillment.colors.length - 1 - indice],
          })),
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
        datos?.data?.orderCreateds.map(async (pedido: any) => {
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
            collectionIds.push(subResult);
          }

          return {
            ...pedido,
            collectionIds,
            mintedTokens,
            fulfillment: await JSON.parse(pedido?.fulfillment),
            decrypted: false,
          };
        })
      );

      setTodosLosPedidos(pedidos);
      setDescifrarCargando(Array.from({ length: pedidos.length }, () => false));
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
  };
};

export default usePedidos;
