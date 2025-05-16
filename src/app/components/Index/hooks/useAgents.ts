import { useContext, useEffect, useState } from "react";
import { Activity, AgentDetails, Pantalla } from "../types/index.type";
import { ModalContext } from "@/app/providers";
import { getAgents } from "../../../../../graphql/queries/getAgents";
import {
  fetchAccountsAvailable,
  fetchAccountStats,
} from "@lens-protocol/client/actions";
import { INFURA_GATEWAY, numberToAutograph } from "@/app/lib/constants";
import { Account, AccountStats, evmAddress } from "@lens-protocol/client";
import { getAgentScores } from "../../../../../graphql/queries/getAgentScores";

const useAgents = () => {
  const contexto = useContext(ModalContext);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pantallaCambiada, setPantallaCambiada] = useState<Pantalla>(
    Pantalla.Puntaje
  );
  const profileCache = new Map<string, Account>();
  const metadataCache = new Map<
    string,
    {
      imagenes: string;
      titulo: string;
    }
  >();
  const statsCache = new Map<string, AccountStats>();
  const [agentCollectionsCargando, setAgentsCollectionsCargando] =
    useState<boolean>(false);
  const [agentCollections, setAgentsCollections] = useState<AgentDetails[]>([]);

  const getAgentsCollections = async () => {
    setAgentsCollectionsCargando(true);

    try {
      const datos = await getAgents();
      const activity = await getAgentScores();
      const agents = await Promise.all(
        (contexto?.escenas?.flatMap((es) => es?.sprites) || [])?.map(
          async (sprite) => {
            const agent = (
              datos?.data?.agentCollections_collection || []
            )?.find(
              (sp: any) =>
                sprite.billetera?.toLowerCase() == sp?.npc?.toLowerCase()
            );
            const score = (activity?.data?.agents || [])?.find(
              (sp: any) =>
                sprite.billetera?.toLowerCase() == sp?.npc?.toLowerCase()
            );

            let collections = [];
            let account = profileCache.get(sprite?.billetera);
            let stats = statsCache.get(sprite?.billetera);

            if (!account) {
              const accounts = await fetchAccountsAvailable(
                contexto?.clienteLens ??
                  contexto?.lensConectado?.sessionClient!,
                {
                  managedBy: evmAddress(sprite?.billetera),
                  includeOwned: true,
                }
              );

              if (accounts.isOk()) {
                account = accounts?.value?.items?.[0]?.account;
                profileCache.set(sprite?.billetera, account);
              }
            }

            if (!stats) {
              const statsRes = await fetchAccountStats(
                contexto?.lensConectado?.sessionClient ||
                  contexto?.clienteLens!,
                {
                  account: evmAddress(sprite?.billetera),
                }
              );

              if (statsRes.isOk()) {
                stats = statsRes?.value as AccountStats;
                statsCache.set(sprite?.billetera, stats);
              }
            }

            if (agent) {
              collections = await Promise.all(
                (agent?.collections || [])?.map(async (col: any) => {
                  let profile = profileCache.get(col?.designer);

                  if (!profile) {
                    const accounts = await fetchAccountsAvailable(
                      contexto?.clienteLens ??
                        contexto?.lensConectado?.sessionClient!,
                      {
                        managedBy: evmAddress(col?.designer),
                        includeOwned: true,
                      }
                    );

                    if (accounts.isOk()) {
                      profile = accounts?.value?.items?.[0]?.account;

                      profileCache.set(
                        col?.designer,
                        accounts?.value?.items?.[0]?.account
                      );
                    }
                  }

                  let metadata = metadataCache.get(col?.uri);

                  if (!metadata && !col?.metadata) {
                    const res = await fetch(
                      `${INFURA_GATEWAY}/ipfs/${
                        col?.uri?.split("ipfs://")?.[1]
                      }`
                    );
                    const json = await res.json();

                    metadata = {
                      titulo: json?.title,
                      imagenes: json?.images,
                    };

                    metadataCache.set(col?.uri, metadata);
                  }

                  return {
                    precio: Number(col.price),
                    tipo: numberToAutograph[Number(col.type)],
                    coleccionId: col.collectionId,
                    profile,
                    ...metadata,
                  };
                })
              );
            }

            return {
              ...sprite,
              account,
              collections,
              stats,
              score: {
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
                      spectator: sc?.spectator,
                      spectatorProfile: spectatorProfile,
                      blockTimestamp: sc?.blockTimestamp,
                      spectateMetadata: sc?.spectateMetadata,
                    };
                  })
                )) as Activity[],
              },
            };
          }
        )
      );
      setAgentsCollections(agents);
    } catch (err: any) {
      console.error(err.message);
    }
    setAgentsCollectionsCargando(false);
  };

  useEffect(() => {
    if (agentCollections?.length < 1 && Number(contexto?.escenas?.length) > 0) {
      getAgentsCollections();
    }
  }, [contexto?.escenas]);

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(
           //  `ws://127.0.0.1:8080?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`

           `wss://npc-rust-engine.onrender.com?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`
      );

      setSocket(newSocket);

      newSocket.onopen = () => {
        newSocket.send(
          JSON.stringify({
            tipo: "datosDeEscenas",
            clave: "estudio abierto de trabajo",
          })
        );
      };

      newSocket.onerror = (error) => {
        console.error(error);
      };

      newSocket.onmessage = (evento) => {
        const datos = JSON.parse(evento.data);
        const nombre = datos.nombre;
        const valores = datos.datos;
        if (nombre === "datosDeEscenas") {
          contexto?.setEscenas(valores);
        }
      };

      const closeWebSocket = () => {
        newSocket.close();
      };

      window.addEventListener("beforeunload", closeWebSocket);

      return () => {
        window.removeEventListener("beforeunload", closeWebSocket);

        if (newSocket.readyState === WebSocket.OPEN) {
          newSocket.close();
        }
      };
    }
  }, []);

  return {
    agentCollectionsCargando,
    pantallaCambiada,
    setPantallaCambiada,
    agentCollections,
  };
};

export default useAgents;
