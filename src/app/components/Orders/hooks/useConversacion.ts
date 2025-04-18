import { ModalContext } from "@/app/providers";
import { useContext, useEffect, useRef, useState } from "react";
import { createWalletClient, custom, toBytes } from "viem";
import { useAccount } from "wagmi";
import { Client, DecodedMessage } from "@xmtp/browser-sdk";
import { INBOX_ID } from "@/app/lib/constants";
import { chains } from "@lens-chain/sdk/viem";

const useConversacion = () => {
  const { address } = useAccount();
  const contexto = useContext(ModalContext);
  const mensajeRef = useRef<HTMLVideoElement>(null);
  const [conversacionCargando, setConversacionCargando] =
    useState<boolean>(false);
  const [abierta, setAbierta] = useState<{
    conversacion: boolean;
    envio: boolean;
  }>({
    conversacion: false,
    envio: false,
  });
  const [mensaje, setMensaje] = useState<string>("");
  const [mensajeCargando, setMensajeCargando] = useState<boolean>(false);
  const [conversacion, setConversacion] = useState<DecodedMessage[]>([]);
  const [cliente, setCliente] = useState<Client | undefined>();

  const manejarCliente = async (): Promise<Client | undefined> => {
    try {
      const clientWallet = createWalletClient({
        account: address,
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const client = await Client.create(
        {
          type: "EOA",
          getIdentifier: () => ({
            identifier: address!.toLowerCase(),
            identifierKind: "Ethereum",
          }),
          signMessage: async (message: string) => {
            const signature = await clientWallet.signMessage({
              account: address!,
              message,
            });
            return toBytes(signature);
          },
        },
        {
          env: "production",
        }
      );
      setCliente(client);

      return client;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const manejarConversaciones = async () => {
    setConversacionCargando(true);
    try {
      let clienteValido: Client | undefined = cliente;
      if (!clienteValido) {
        clienteValido = await manejarCliente();
      }

      const conversacion = await clienteValido!.conversations?.newDm(INBOX_ID);
      const mensajes = await conversacion.messages();
      

      setConversacion(mensajes);
    } catch (err: any) {
      console.error(err.message);
    }
    setConversacionCargando(false);
  };

  const enviarMensaje = async () => {
    setMensajeCargando(true);
    try {
      let clienteValido: Client | undefined = cliente;
      if (!clienteValido) {
        clienteValido = await manejarCliente();
      }

      const conversacion = await clienteValido!.conversations?.newDm(INBOX_ID);

      if (mensaje?.trim() !== "") {
        await conversacion.send(mensaje);

        setMensaje("");
        const newMessages = await conversacion.messages();
        setConversacion(newMessages);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setMensajeCargando(false);
  };

  useEffect(() => {
    if (
      contexto?.lensConectado?.profile &&
      contexto?.pantalla == 2 &&
      abierta?.conversacion
    ) {
      manejarConversaciones();
    }
  }, [
    contexto?.lensConectado?.profile,
    contexto?.pantalla,
    abierta?.conversacion,
  ]);

  return {
    conversacionCargando,
    conversacion,
    enviarMensaje,
    mensajeCargando,
    abierta,
    setAbierta,
    setMensaje,
    mensaje,
    mensajeRef,
  };
};

export default useConversacion;
