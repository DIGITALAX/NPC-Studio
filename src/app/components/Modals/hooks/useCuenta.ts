import { ModalContext } from "@/app/providers";
import { Account, AccountStats } from "@lens-protocol/client";
import { useContext, useEffect, useState } from "react";
import { Indexar, Sprite } from "../../Common/types/common.types";
import {
  fetchAccount,
  fetchAccounts,
  fetchAccountStats,
  fetchUsername,
  follow,
  unfollow,
} from "@lens-protocol/client/actions";

const useCuenta = (
  dict: any,
  direccionNPC?: string | undefined,
  handle?: string | undefined
) => {
  const contexto = useContext(ModalContext);
  const [seguirCargando, setSeguirCargando] = useState<boolean>(false);
  const [npcCargando, setNPCCargando] = useState<boolean>(false);
  const [perfil, setPerfil] = useState<
    | {
        account: Account;
        sprite?: Sprite;
        stats?: AccountStats;
      }
    | undefined
  >();

  const seguirNpc = async () => {
    if (!contexto?.lensConectado?.sessionClient) return;
    setSeguirCargando(true);
    try {
      contexto?.setIndexar(Indexar.Indexando);
      const res = await follow(contexto?.lensConectado?.sessionClient, {
        account: direccionNPC ?? contexto?.mostrarPerfil,
      });

      if (res?.isErr()) {
        contexto?.setError(dict.Home.errorFollow);
        setSeguirCargando(false);
        return;
      }

      contexto?.setIndexar(Indexar.Exito);
    } catch (err: any) {
      console.error(err.message);
    }
    setPerfil({
      ...perfil,
      account: {
        ...perfil?.account!,
        operations: {
          ...perfil?.account?.operations!,
          isFollowedByMe: true,
        },
      },
    });
    setTimeout(() => {
      contexto?.setIndexar(Indexar.Inactivo);
    }, 3000);
    setSeguirCargando(false);
  };

  const dejarNpc = async () => {
    if (!contexto?.lensConectado?.sessionClient) return;

    setSeguirCargando(true);
    try {
      contexto?.setIndexar(Indexar.Indexando);
      const res = await unfollow(contexto?.lensConectado?.sessionClient, {
        account: direccionNPC ?? contexto?.mostrarPerfil,
      });

      if (res?.isErr()) {
        contexto?.setError(dict.Home.errorFollow);
        setSeguirCargando(false);
        return;
      }

      setPerfil({
        ...perfil,
        account: {
          ...perfil?.account!,
          operations: {
            ...perfil?.account?.operations!,
            isFollowedByMe: false,
          },
        },
      });
      contexto?.setIndexar(Indexar.Exito);
    } catch (err: any) {
      console.error(err.message);
    }
    setTimeout(() => {
      contexto?.setIndexar(Indexar.Inactivo);
    }, 3000);
    setSeguirCargando(false);
  };

  const llamaNPC = async () => {
    if (!contexto?.clienteLens) return;
    setNPCCargando(true);
    try {
      let account;

      const datos = await fetchAccount(
        contexto?.lensConectado?.sessionClient || contexto?.clienteLens,
        {
          address: handle
            ? contexto?.escenas
                ?.flatMap((es) => es?.sprites)
                ?.find((spr) => spr?.etiqueta?.toLowerCase() == handle)
                ?.account_address
            : direccionNPC ?? contexto?.mostrarPerfil,
        }
      );

      if (!datos?.isOk()) {
        setNPCCargando(false);
        return;
      }
      account = datos?.value as Account;

      let npc;
      const sprite = contexto?.escenas
        ?.flatMap((es) => es?.sprites)
        ?.find(
          (sprite) =>
            sprite?.account_address?.toLowerCase() ==
            account?.address?.toLowerCase()
        );
      if (sprite) {
        npc = {
          ...sprite,
          account,
          amigos: sprite?.amigos?.map(
            (npc) =>
              contexto?.escenas
                ?.flatMap((es) => es?.sprites)
                ?.find(
                  (sprite) =>
                    sprite?.billetera?.toLowerCase() ==
                    (npc as unknown as string)?.toLowerCase()
                ) as Sprite
          ),
        };
      }
      const statsRes = await fetchAccountStats(
        contexto?.lensConectado?.sessionClient || contexto?.clienteLens!,
        {
          account: account?.owner,
        }
      );
      let stats;

      if (statsRes.isOk()) {
        stats = statsRes?.value as AccountStats;
      }

      setPerfil({
        account,
        sprite: npc,
        stats,
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setNPCCargando(false);
  };

  useEffect(() => {
    if (
      (contexto?.mostrarPerfil || direccionNPC || handle) &&
      Number(contexto?.escenas?.length) > 0 &&
      contexto?.clienteLens
    ) {
      llamaNPC();
    }
  }, [
    contexto?.mostrarPerfil,
    direccionNPC,
    handle,
    contexto?.escenas,
    contexto?.clienteLens,
  ]);

  return {
    perfil,
    seguirCargando,
    seguirNpc,
    dejarNpc,
    npcCargando,
  };
};

export default useCuenta;
