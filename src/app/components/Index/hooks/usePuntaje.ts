import { useState, useEffect, useContext } from "react";
import { getAgentScores } from "../../../../../graphql/queries/getAgentScores";
import { Account, evmAddress } from "@lens-protocol/client";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { ModalContext } from "@/app/providers";
import { Activity } from "../types/index.type";

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
          ?.flatMap((ag: any) => ag?.scores)
          ?.map(async (score: any) => {
            let profile = profileCache.get(score?.scorer);

            if (!profile) {
              const res = await fetchAccountsAvailable(
                contexto?.lensConectado?.sessionClient ??
                  contexto?.clienteLens!,
                {
                  includeOwned: true,
                  managedBy: evmAddress(score?.scorer),
                }
              );

              if (res?.isOk()) {
                profile = res?.value?.items?.[0]?.account;
                profileCache.set(score?.scorer, profile);
              }
            }

            return {
              npc: score?.address,
              au: score?.au,
              auTotal: score?.auTotal,
              cycleSpectators: score?.cycleSpectators,
              activity: (await Promise.all(
                (score?.activity || [])?.map(async (sc: any) => {
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

                  return {
                    data: sc?.data,
                    id: sc?.id,
                    spectator: sc?.spectator,
                    spectatorProfile: spectatorProfile,
                    blockTimestamp: sc?.blockTimestamp,
                    spectateMetadata: sc?.spectateMetadata,
                  };
                })
              )) as Activity[],
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
    if (historial?.length < 1) {
      manejarHistorial();
    }
  }, []);

  return {
    puntajeCargando,
    historial,
  };
};

export default usePuntaje;
