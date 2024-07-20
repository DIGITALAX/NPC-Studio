import { SetStateAction, useEffect, useState } from "react";
import { Profile } from "../../../../graphql/generated";
import getProfile from "../../../../graphql/lens/queries/profile";
import { Sprite } from "../types/game.types";
import lensSeguir from "@/lib/helpers/lensSeguir";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygon } from "viem/chains";
import { Indexar } from "@/components/common/types/common.types";

const useCuenta = (
  npc: Sprite | undefined,
  lensConnected: Profile | undefined,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void
) => {
  const [seguirCargando, setSeguirCargando] = useState<boolean>(false);
  const [npcCargando, setNPCCargando] = useState<boolean>(false);
  const [perfil, setPerfil] = useState<Profile | undefined>();

  const seguirNpc = async () => {
    setSeguirCargando(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      lensSeguir(
        true,
        "0x0" + npc?.perfil_id.toString(16),
        lensConnected?.id,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setSeguirCargando(false);
  };

  const dejarNpc = async () => {
    setSeguirCargando(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      lensSeguir(
        false,
        "0x0" + npc?.perfil_id.toString(16),
        lensConnected?.id,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setSeguirCargando(false);
  };

  const llamaNPC = async () => {
    setNPCCargando(true);
    try {
      const datos = await getProfile(
        {
          forProfileId: "0x0" + npc?.perfil_id?.toString(16),
        },
        lensConnected?.id
      );

      setPerfil(datos?.data?.profile as Profile);
    } catch (err: any) {
      console.error(err.message);
    }
    setNPCCargando(false);
  };

  useEffect(() => {
    if (npc) {
      llamaNPC();
    }
  }, [npc]);

  return {
    perfil,
    seguirCargando,
    seguirNpc,
    dejarNpc,
    npcCargando,
  };
};

export default useCuenta;
