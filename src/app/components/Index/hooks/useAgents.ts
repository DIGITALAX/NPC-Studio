import { useContext, useEffect, useState } from "react";
import { AgentScore, Pantalla } from "../types/index.type";
import { Coleccion, Sprite } from "../../Common/types/common.types";
import { ModalContext } from "@/app/providers";
import { getAgents } from "../../../../../graphql/queries/getAgents";
import {
  fetchAccountsAvailable,
  fetchAccountStats,
} from "@lens-protocol/client/actions";
import { numberToAutograph } from "@/app/lib/constants";
import { Account, AccountStats, evmAddress } from "@lens-protocol/client";
import { getAgentScores } from "../../../../../graphql/queries/getAgentScores";

const useAgents = () => {
  const contexto = useContext(ModalContext);
  const [pantalla, setPantalla] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth > 1280 : true
  );
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pantallaCambiada, setPantallaCambiada] = useState<Pantalla>(
    Pantalla.Puntaje
  );
  const profileCache = new Map<string, Account>();
  const scorerProfileCache = new Map<string, Account>();
  const [agentCollectionsCargando, setAgentsCollectionsCargando] =
    useState<boolean>(false);
  const [agentCollections, setAgentsCollections] = useState<
    (Sprite & {
      collections?: Coleccion[];
      historial?: AgentScore & {
        stats?: AccountStats;
      };
    })[]
  >([]);

  const getAgentsCollections = async () => {
    setAgentsCollectionsCargando(true);

    try {
      const datos = await getAgents();
      const scores = await getAgentScores();
      const agents = await Promise.all(
        (contexto?.escenas?.flatMap((es) => es?.sprites) || [])?.map(
          async (sprite) => {
            const agent = datos?.data?.agentCollections_collection?.find(
              (sp: any) =>
                sprite.billetera?.toLowerCase() == sp?.npc?.toLowerCase()
            );
            const score = scores?.data?.agentScores_collection?.find(
              (sp: any) =>
                sprite.billetera?.toLowerCase() == sp?.npc?.toLowerCase()
            );

            let profile, collections, stats;
            const accounts = await fetchAccountsAvailable(
              contexto?.clienteLens ?? contexto?.lensConectado?.sessionClient!,
              {
                managedBy: evmAddress(sprite?.billetera),
                includeOwned: true,
              }
            );

            const statsRes = await fetchAccountStats(
              contexto?.lensConectado?.sessionClient || contexto?.clienteLens!,
              {
                account: evmAddress(sprite?.billetera),
              }
            );

            if (accounts.isOk()) {
              profile = accounts?.value?.items?.[0]?.account;
            }

            if (statsRes.isOk()) {
              stats = statsRes?.value as AccountStats;
            }

            if (agent) {
              collections = await Promise.all(
                agent?.collections?.map(async (col: any) => {
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

                  return {
                    precio: Number(col.price),
                    tipo: numberToAutograph[Number(col.type)],
                    titulo: col.metadata?.title,
                    imagenes: col.metadata?.images,
                    coleccionId: col.collectionId,
                    profile,
                  };
                })
              );
            }

            return {
              ...sprite,
              account: profile,
              collections,
              historial: {
                stats,
                npc: score?.npc,
                auEarnedTotal: score?.auEarnedTotal,
                auEarnedCurrent: score?.auEarnedCurrent,
                scores: await Promise.all(
                  score?.scores?.map(async (sc: any) => {
                    let scorerProfile = scorerProfileCache.get(sc?.scorer);

                    if (!scorerProfile) {
                      const accounts = await fetchAccountsAvailable(
                        contexto?.clienteLens ??
                          contexto?.lensConectado?.sessionClient!,
                        {
                          managedBy: evmAddress(sc?.scorer),
                          includeOwned: true,
                        }
                      );

                      if (accounts.isOk()) {
                        scorerProfile = accounts?.value?.items?.[0]?.account;

                        scorerProfileCache.set(
                          sc?.scorer,
                          accounts?.value?.items?.[0]?.account
                        );
                      }
                    }

                    return {
                      scorer: sc?.scorer,
                      blockTimestamp: sc?.blockTimestamp,
                      scorerProfile,
                      metadata: {
                        comment: sc?.comment,
                        model: Number(sc?.model),
                        scene: Number(sc?.scene),
                        chatContext: Number(sc?.chatContext),
                        appearance: Number(sc?.appearance),
                        personality: Number(sc?.personality),
                        training: Number(sc?.training),
                        lora: Number(sc?.lora),
                        collections: Number(sc?.collections),
                        spriteSheet: Number(sc?.spriteSheet),
                        tokenizer: Number(sc?.tokenizer),
                        global: Number(sc?.global),
                      },
                    };
                  })
                ),
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
    const handleResize = () => {
      setPantalla(window.innerWidth > 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(
        // `ws://127.0.0.1:8080?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`

        `wss://npc-rust-engine.onrender.com?key=${process.env.NEXT_PUBLIC_RENDER_KEY}`
      );

      setSocket(newSocket);

      newSocket.onopen = () => {
        newSocket.send(
          JSON.stringify({
            tipo: "datosDeEscenas",
            clave:
              // : "estudio abierto de trabajo"
              "ático de intercambio de varianza",
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
    pantalla,
    agentCollectionsCargando,
    pantallaCambiada,
    setPantallaCambiada,
    agentCollections,
  };
};

export default useAgents;
