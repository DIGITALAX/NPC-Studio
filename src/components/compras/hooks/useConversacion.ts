import {  DecodedMessage, Client } from "@xmtp/xmtp-js";
import { useEffect, useRef, useState } from "react";
import {  Profile } from "../../../../graphql/generated";
import { DIGITALAX_ADDRESS } from "@/lib/constants";
import { createWalletClient, custom } from "viem";
import { polygon } from "viem/chains";

const useConversacion = (
  lens: Profile | undefined,
  address: `0x${string}` | undefined,
  pantalla: number
) => {
  const mensajeRef = useRef<HTMLVideoElement>();
  const [conversacionCargando, setConversacionCargando] =
    useState<boolean>(false);
  const [conversacionAbierta, setConversacionAbierta] =
    useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>("");
  const [mensajeCargando, setMensajeCargando] = useState<boolean>(false);
  const [conversacion, setConversacion] = useState<DecodedMessage[]>([]);
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

  const manejarConversaciones = async () => {
    setConversacionCargando(true);
    try {
      let clienteValido: Client | undefined = cliente;
      if (!clienteValido) {
        clienteValido = await manejarCliente();
      }

      const conversacion = await clienteValido!.conversations?.newConversation(
        DIGITALAX_ADDRESS
      );
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

      const conversacion = await clienteValido!.conversations?.newConversation(
        DIGITALAX_ADDRESS
      );

      if (mensaje?.trim() !== "") {
        const datos = conversacion.send(mensaje);

        if ((await datos).sent) {
          setMensaje("");
          const newMessages = await conversacion.messages();
          setConversacion(newMessages);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setMensajeCargando(false);
  };

  useEffect(() => {
    if (lens && pantalla == 2 && conversacionAbierta) {
      manejarConversaciones();
    }
  }, [lens, pantalla, conversacionAbierta]);

  return {
    conversacionCargando,
    conversacion,
    enviarMensaje,
    mensajeCargando,
    conversacionAbierta,
    setConversacionAbierta,
    setMensaje,
    mensaje,
    mensajeRef
  };
};

export default useConversacion;
