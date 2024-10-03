import { DIGITALAX_ADDRESS } from "@/lib/constants";
import { SetStateAction, useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { Dictionary, DatosOraculos } from "../types/game.types";
import { Client } from "@xmtp/xmtp-js";
import { polygon } from "viem/chains";
import { Erc20, LimitType } from "../../../../graphql/generated";
import { getOracleData } from "../../../../graphql/autograph/queries/getOracleData";
import getEnabledCurrencies from "../../../../graphql/lens/queries/enabledCurrencies";

const useGifs = (
  address: `0x${string}` | undefined,
  dict: Dictionary,
  oraculos: DatosOraculos[],
  setOraculos: (e: SetStateAction<DatosOraculos[]>) => void
) => {
  const [monedasDisponibles, setMonedasDisponibles] = useState<Erc20[]>([]);
  const [mensajeCargando, setMensajeCargando] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>(dict.Home.message);
  const [cliente, setCliente] = useState<Client | undefined>();
  const [gifCargando, setGifCargando] = useState<boolean>(false);
  const [drops, setDrops] = useState<{
    award: string;
    whoCollectsOpen: boolean;
    creatorAwardOpen: boolean;
    currencyOpen: boolean;
    editionOpen: boolean;
    edition: string;
    timeOpen: boolean;
    time: string;
  }>({
    award: "No",
    whoCollectsOpen: false,
    creatorAwardOpen: false,
    currencyOpen: false,
    editionOpen: false,
    edition: "No",
    timeOpen: false,
    time: "No",
  });
  const [buscarGifs, setBuscarGifs] = useState<{
    search: string;
    gifs: any[];
  }>({
    search: "",
    gifs: [],
  });
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

  const manejarOraculos = async (): Promise<void> => {
    try {
      const datos = await getOracleData();

      setOraculos(datos?.data?.currencyAddeds);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const manejarGif = async (search: string) => {
    setGifCargando(true);
    try {
      const response = await fetch("/api/giphy", {
        method: "POST",
        body: JSON.stringify({ query: search }),
      });
      const allGifs = await response.json();
      setBuscarGifs((prev) => ({
        ...prev,
        gifs: allGifs?.data?.results,
      }));
    } catch (err: any) {
      console.error(err.message);
    }
    setGifCargando(false);
  };

  useEffect(() => {
    if (oraculos?.length < 1) {
      manejarOraculos();
    }
  }, []);

  const llamarMonedas = async (): Promise<void> => {
    try {
      const response = await getEnabledCurrencies({
        limit: LimitType.TwentyFive,
      });

      if (response && response.data) {
        setMonedasDisponibles(response?.data?.currencies?.items);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (monedasDisponibles?.length < 1) {
      llamarMonedas();
    }
  }, []);

  return {
    manejarEnviarMensaje,
    mensajeCargando,
    setMensaje,
    mensaje,
    manejarGif,
    buscarGifs,
    setBuscarGifs,
    gifCargando,
    monedasDisponibles,
    drops,
    setDrops,
  };
};

export default useGifs;
