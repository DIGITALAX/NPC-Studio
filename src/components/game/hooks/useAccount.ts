import { AUTOGRAPH_ACCESS_CONTROLS, DIGITALAX_ADDRESS } from "@/lib/constants";
import { SetStateAction, useEffect, useState } from "react";
import { PublicClient, createWalletClient, custom } from "viem";
import { Dictionary } from "../types/game.types";
import { Client } from "@xmtp/xmtp-js";
import { polygon } from "viem/chains";

const useAccount = (
  isConnected: boolean,
  setEsArtista: (e: SetStateAction<boolean>) => void,
  setLensConectado: (e: SetStateAction<boolean>) => void,
  openAccountModal: (() => void) | undefined,
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  dict: Dictionary
) => {
  const [lensCargando, setLensCargando] = useState<boolean>(false);
  const [mensajeCargando, setMensajeCargando] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>(dict.Home.message);
  const [cliente, setCliente] = useState<Client | undefined>();

  const manejarCliente = async (): Promise<Client | undefined> => {
    try {
      const clientWallet = createWalletClient({
        account: address,
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const client = await Client.create(clientWallet as any, {
        env: "production",
      });
      setCliente(client);

      return client;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const manejarEnviarMensaje = async () => {
    setMensajeCargando(true);
    try {
      let clienteValido: Client | undefined = cliente;
      if (!clienteValido) {
        clienteValido = await manejarCliente();
      }

      const conversacion = await clienteValido!.conversations?.newConversation(
        DIGITALAX_ADDRESS
      );

      if (mensaje?.trim() !== "") {
        const datos = conversacion.send(mensaje);

        if ((await datos).sent) {
          setMensaje(dict.Home.sent);
          setTimeout(() => {
            setMensaje("");
          }, 6000);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setMensajeCargando(false);
  };

  const manejarSalir = () => {
    if (openAccountModal) {
      openAccountModal();
    }
    setLensConectado(false);
  };

  const manejarLens = async () => {
    setLensCargando(true);
    try {
    } catch (err: any) {
      console.error(err.message);
    }
    setLensCargando(false);
  };

  const comprobrarArtista = async () => {
    try {
      const data = await publicClient.readContract({
        address: AUTOGRAPH_ACCESS_CONTROLS,
        abi: [
          {
            type: "function",
            name: "isDesigner",
            inputs: [
              { name: "_address", type: "address", internalType: "address" },
            ],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
          },
        ],
        functionName: "isDesigner",
        args: [address!],
      });
      setEsArtista(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      comprobrarArtista();
    } else {
      setEsArtista(false);
    }
  }, [isConnected, address]);

  return {
    manejarSalir,
    manejarLens,
    lensCargando,
    manejarEnviarMensaje,
    mensajeCargando,
    setMensaje,
    mensaje,
  };
};

export default useAccount;
