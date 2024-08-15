import { SetStateAction, useEffect, useState } from "react";
import { Profile } from "../../../../graphql/generated";
import getProfile from "../../../../graphql/lens/queries/profile";
import { Escena, Sprite } from "../types/game.types";
import lensSeguir from "@/lib/helpers/lensSeguir";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygon } from "viem/chains";
import { Indexar } from "@/components/common/types/common.types";
import getProfiles from "../../../../graphql/lens/queries/profiles";

const useCuenta = (
  npc: Sprite | undefined | string,
  lensConectado: Profile | undefined,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  escenas: Escena[]
) => {
  const [seguirCargando, setSeguirCargando] = useState<boolean>(false);
  const [npcCargando, setNPCCargando] = useState<boolean>(false);
  const [perfil, setPerfil] = useState<Profile | undefined>();
  const [esNPC, setEsNPC] = useState<Sprite | undefined>();

  const seguirNpc = async () => {
    setSeguirCargando(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensSeguir(
        true,
        (npc as Sprite)?.perfil_id
          ? "0x0" + (npc as Sprite)?.perfil_id.toString(16)?.split("0x")?.[1]
          : (npc as string),
        lensConectado?.ownedBy?.address,
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
      await lensSeguir(
        false,
        (npc as Sprite)?.perfil_id
          ? "0x0" + (npc as Sprite)?.perfil_id.toString(16)?.split("0x")?.[1]
          : (npc as string),
        lensConectado?.ownedBy?.address,
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
          forProfileId: (npc as Sprite)?.perfil_id
            ? "0x0" + (npc as Sprite)?.perfil_id.toString(16)?.split("0x")?.[1]
            : (npc as string),
        },
        lensConectado?.id
      );

      setPerfil(datos?.data?.profile as Profile);

      if (typeof npc == "string") {
        if (
          escenas?.some((e) =>
            e.sprites?.some(
              (s) => "0x0" + s.perfil_id?.toString(16)?.split("0x")?.[1] == npc
            )
          )
        ) {
          const sprite = escenas
            ?.find((e) =>
              e.sprites?.find(
                (s) =>
                  "0x0" + s.perfil_id?.toString(16)?.split("0x")?.[1] == npc
              )
            )
            ?.sprites?.find(
              (n) => "0x0" + n.perfil_id?.toString(16)?.split("0x")?.[1] == npc
            )!;

          setEsNPC({ ...sprite });
        }
      } else {
        const sprite = escenas
          ?.find((e) =>
            e.sprites?.find(
              (s) =>
                "0x0" + s.perfil_id?.toString(16)?.split("0x")?.[1] ==
                "0x0" + npc?.perfil_id.toString(16)?.split("0x")?.[1]
            )
          )
          ?.sprites?.find(
            (n) =>
              "0x0" + n.perfil_id?.toString(16)?.split("0x")?.[1] ==
              "0x0" + npc?.perfil_id.toString(16)?.split("0x")?.[1]
          )!;

        const datos = await getProfiles(
          {
            where: {
              profileIds: sprite.prompt.amigos?.flatMap(
                (a) => "0x0" + a?.toString(16)?.split("0x")?.[1]
              ),
            },
          },
          lensConectado?.id
        );

        const amigos = sprite.prompt.amigos
          .map(
            (amigo) =>
              escenas
                .flatMap((s) => s.sprites)
                .find((s) => s.perfil_id == amigo)!
          )
          ?.map((a, i) => ({
            ...a,
            handle:
              datos?.data?.profiles?.items?.[i]?.handle?.suggestedFormatted
                ?.localName!,
          }));

        setEsNPC({ ...sprite, amigos });
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setNPCCargando(false);
  };

  useEffect(() => {
    if (npc) {
      llamaNPC();
    } else {
      setEsNPC(undefined);
    }
  }, [npc]);

  return {
    perfil,
    seguirCargando,
    seguirNpc,
    dejarNpc,
    npcCargando,
    esNPC,
  };
};

export default useCuenta;
