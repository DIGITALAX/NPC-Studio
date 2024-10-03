import { AUTOGRAPH_ACCESS_CONTROLS } from "@/lib/constants";
import { SetStateAction, useEffect, useState } from "react";
import { PublicClient } from "viem";
import { DatosOraculos } from "../types/game.types";
import {
  getAuthenticationToken,
  isAuthExpired,
  refreshAuth,
  removeAuthenticationToken,
  setAuthenticationToken,
} from "@/lib/utils";
import { Profile } from "../../../../graphql/generated";
import { Notificacion } from "@/components/common/types/common.types";
import { useSignMessage } from "wagmi";
import generateChallenge from "../../../../graphql/lens/queries/challenge";
import authenticate from "../../../../graphql/lens/mutations/authenticate";
import getDefaultProfile from "../../../../graphql/lens/queries/default";
import { getOracleData } from "../../../../graphql/autograph/queries/getOracleData";

const useAccount = (
  isConnected: boolean,
  setEsArtista: (e: SetStateAction<boolean>) => void,
  setLensConectado: (e: SetStateAction<Profile | undefined>) => void,
  setNotificacion: (e: SetStateAction<Notificacion>) => void,
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  lensConectado: Profile | undefined,
  setOraculos: (e: SetStateAction<DatosOraculos[]>) => void,
  openAccountModal: (() => void) | undefined
) => {
  const { signMessageAsync } = useSignMessage();
  const [lensCargando, setLensCargando] = useState<boolean>(false);
  const [opcionAbierta, setOpcionAbierta] = useState<
    | {
        tipo: string;
        indice: number;
      }
    | undefined
  >();

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

  const manejarSalir = () => {
    if (openAccountModal) {
      openAccountModal();
    }
    removeAuthenticationToken();
    setLensConectado(undefined);
  };

  return {
    manejarLens,
    lensCargando,
    manejarSalir,
    opcionAbierta,
    setOpcionAbierta,
  };
};

export default useAccount;
