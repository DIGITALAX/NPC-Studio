import { useState, useEffect, useContext } from "react";
import { getAgentScores } from "../../../../../graphql/queries/getAgentScores";
import { Account, evmAddress } from "@lens-protocol/client";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { ModalContext } from "@/app/providers";
import { Activity } from "../types/index.type";
import { INFURA_GATEWAY } from "@/app/lib/constants";

const usePuntaje = () => {
  const contexto = useContext(ModalContext);
  const [puntajeCargando, setPuntajeCargando] = useState<boolean>(false);
  const [historial, setHistorial] = useState<Activity[]>([]);
  const profileCache = new Map<string, Account>();

  const manejarHistorial = async () => {
    setPuntajeCargando(true);
    try {
      const datos = await getAgentScores();

      const res = await Promise.all(
        (datos?.data?.agents || [])
          ?.flatMap((ag: any) => ag?.activity)
          ?.map(async (sc: any) => {
            let spectatorProfile = profileCache.get(sc?.spectator);

            if (!spectatorProfile) {
              const accounts = await fetchAccountsAvailable(
                contexto?.clienteLens ??
                  contexto?.lensConectado?.sessionClient!,
                {
                  managedBy: evmAddress(sc?.spectator),
                  includeOwned: true,
                }
              );

              if (accounts.isOk()) {
                spectatorProfile = accounts?.value?.items?.[0]?.account;

                profileCache.set(
                  sc?.spectator,
                  accounts?.value?.items?.[0]?.account
                );
              }
            }

            const res = await fetch(
              `${INFURA_GATEWAY}/ipfs/${sc?.data?.split("ipfs://")?.[1]}`
            );
            const data = await res.json();
            return {
              data,
              id: sc?.id,
              spectator: sc?.spectator,
              spectatorProfile: spectatorProfile,
              blockTimestamp: sc?.blockTimestamp,
              spectateMetadata: sc?.spectateMetadata,
            };
          })
      );
      setHistorial(res);
    } catch (err: any) {
      console.error(err.message);
    }
    setPuntajeCargando(false);
  };

  useEffect(() => {
    if (historial?.length < 1 && contexto?.clienteLens) {
      manejarHistorial();
    }
  }, [contexto?.clienteLens]);

  return {
    puntajeCargando,
    historial,
  };
};

export default usePuntaje;
