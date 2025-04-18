import { useContext, useEffect, useState } from "react";
import { AgentScore } from "../../Index/types/index.type";
import { Coleccion } from "../../Common/types/common.types";
import { getAgentScore } from "../../../../../graphql/queries/getAgentScore";
import { getAgent } from "../../../../../graphql/queries/getAgent";
import { Account, evmAddress } from "@lens-protocol/client";
import { numberToAutograph } from "@/app/lib/constants";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { ModalContext } from "@/app/providers";

const useAgent = (agente: string | undefined) => {
  const contexto = useContext(ModalContext);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [infoCargando, setInfoCargando] = useState<boolean>(false);
  const profileCache = new Map<string, Account>();
  const scorerProfileCache = new Map<string, Account>();
  const [pantalla, setPantalla] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth > 1280 : true
  );
  const [informacion, setInformacion] = useState<
    AgentScore & {
      colecciones: Coleccion[];
    }
  >();

  const manejarAgente = async () => {
    if (!agente) return;
    setInfoCargando(true);
    try {
      const datos = await getAgent(agente?.toLowerCase());
      const scoresDatos = await getAgentScore(agente?.toLowerCase());
      const colecciones = await Promise.all(
        (datos?.data?.agentCollections_collection?.[0]?.collections || [])?.map(
          async (col: any) => {
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
          }
        )
      );

      const info = {
        ...{
          npc: scoresDatos?.data?.agentScores_collection?.[0]?.npc,
          auEarnedCurrent:
            scoresDatos?.data?.agentScores_collection?.[0]?.auEarnedCurrent,
          auEarnedTotal:
            scoresDatos?.data?.agentScores_collection?.[0]?.auEarnedTotal,
          scores: await Promise.all(
            (scoresDatos?.data?.agentScores_collection?.[0]?.scores || [])?.map(
              async (sc: any) => {
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
              }
            )
          ),
        },
        colecciones,
      };
      setInformacion(info);
    } catch (err: any) {
      console.error(err.message);
    }
    setInfoCargando(false);
  };

  useEffect(() => {
    if (!informacion && agente) {
      manejarAgente();
    }
  }, [agente]);

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
    pantalla,
    informacion,
    infoCargando,
  };
};

export default useAgent;
