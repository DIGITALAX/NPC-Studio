import { AUTOGRAPH_ACCESS_CONTROLS, DIGITALAX_ADDRESS } from "@/lib/constants";
import { SetStateAction, useEffect, useState } from "react";
import { PublicClient, createWalletClient, custom } from "viem";
import { Dictionary, DatosOraculos } from "../types/game.types";
import { Client } from "@xmtp/xmtp-js";
import { polygon } from "viem/chains";
import {
  getAuthenticationToken,
  isAuthExpired,
  refreshAuth,
  removeAuthenticationToken,
  setAuthenticationToken,
} from "@/lib/utils";
import { Erc20, LimitType, Profile } from "../../../../graphql/generated";
import { Notificacion } from "@/components/common/types/common.types";
import { useSignMessage } from "wagmi";
import generateChallenge from "../../../../graphql/lens/queries/challenge";
import authenticate from "../../../../graphql/lens/mutations/authenticate";
import getDefaultProfile from "../../../../graphql/lens/queries/default";
import { getOracleData } from "../../../../graphql/autograph/queries/getOracleData";
import getEnabledCurrencies from "../../../../graphql/lens/queries/enabledCurrencies";

const useAccount = (
  isConnected: boolean,
  setEsArtista: (e: SetStateAction<boolean>) => void,
  setLensConectado: (e: SetStateAction<Profile | undefined>) => void,
  openAccountModal: (() => void) | undefined,
  setNotificacion: (e: SetStateAction<Notificacion>) => void,
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  dict: Dictionary,
  lensConectado: Profile | undefined,
  oraculos: DatosOraculos[],
  setOraculos: (e: SetStateAction<DatosOraculos[]>) => void
) => {
  const { signMessageAsync } = useSignMessage();
  const [monedasDisponibles, setMonedasDisponibles] = useState<Erc20[]>([]);
  const [lensCargando, setLensCargando] = useState<boolean>(false);
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
  const [opcionAbierta, setOpcionAbierta] = useState<
    | {
        tipo: string;
        indice: number;
      }
    | undefined
  >();
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
    removeAuthenticationToken();
    setLensConectado(undefined);
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

  const manejarLens = async () => {
    setLensCargando(true);
    try {
      const profile = await getDefaultProfile(
        {
          for: address,
        },
        lensConectado?.id
      );

      if (profile?.data?.defaultProfile?.id) {
        const challengeResponse = await generateChallenge({
          for: profile?.data?.defaultProfile?.id,
          signedBy: address,
        });
        const signature = await signMessageAsync({
          message: challengeResponse.data?.challenge.text!,
        });
        const accessTokens = await authenticate({
          id: challengeResponse.data?.challenge.id,
          signature: signature,
        });
        if (accessTokens) {
          setAuthenticationToken({ token: accessTokens.data?.authenticate! });
          setLensConectado(profile?.data?.defaultProfile as Profile);
        }
      } else {
        setLensConectado(undefined);
        setNotificacion(Notificacion.Perfil);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setLensCargando(false);
  };

  const manejarRefrescarPerfil = async (): Promise<void> => {
    try {
      const profile = await getDefaultProfile(
        {
          for: address,
        },
        lensConectado?.id
      );
      if (profile?.data?.defaultProfile) {
        setLensConectado(profile?.data?.defaultProfile as Profile);
      } else {
        removeAuthenticationToken();
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const manejarOraculos = async (): Promise<void> => {
    try {
      const datos = await getOracleData();

      setOraculos(datos?.data?.currencyAddeds);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      setLensConectado(undefined);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected && address) {
      comprobrarArtista();
    } else {
      setEsArtista(false);
    }

    const manejarAutenticicacion = async () => {
      const token = getAuthenticationToken();
      if (isConnected && !token) {
        setLensConectado(undefined);
        removeAuthenticationToken();
      } else if (isConnected && token) {
        if (isAuthExpired(token?.exp)) {
          const refreshedAccessToken = await refreshAuth();
          if (!refreshedAccessToken) {
            removeAuthenticationToken();
          }
        }
        await manejarRefrescarPerfil();
      }
    };

    manejarAutenticicacion();
  }, [isConnected, address]);

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
    manejarSalir,
    manejarLens,
    lensCargando,
    manejarEnviarMensaje,
    mensajeCargando,
    setMensaje,
    mensaje,
    opcionAbierta,
    setOpcionAbierta,
    manejarGif,
    buscarGifs,
    setBuscarGifs,
    gifCargando,
    monedasDisponibles,
    drops,
    setDrops,
  };
};

export default useAccount;
