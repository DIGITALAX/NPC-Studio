import { useContext, useEffect, useState } from "react";
import { Activity, AgentScore } from "../../Index/types/index.type";
import { Coleccion } from "../../Common/types/common.types";
import { getAgentScore } from "../../../../../graphql/queries/getAgentScore";
import { getAgent } from "../../../../../graphql/queries/getAgent";
import { Account, evmAddress } from "@lens-protocol/client";
import { INFURA_GATEWAY, numberToAutograph } from "@/app/lib/constants";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { ModalContext } from "@/app/providers";

const useAgent = (agente: string | undefined) => {
  const contexto = useContext(ModalContext);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [infoCargando, setInfoCargando] = useState<boolean>(false);
  const profileCache = new Map<string, Account>();
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
      const scores = await getAgentScore(agente?.toLowerCase());
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

            let metadata = col?.metadata;

            if (!col?.metadata) {
              const res = await fetch(
                `${INFURA_GATEWAY}/ipfs/${col?.uri?.split("ipfs://")?.[1]}`
              );
              const json = await res.json();

              metadata = {
                titulo: json?.title,
                imagenes: json?.images,
              };
            }

            return {
              precio: Number(col.price),
              tipo: numberToAutograph[Number(col.type)],
              coleccionId: col.collectionId,
              profile,
              ...metadata,
            };
          }
        )
      );

      const info = {
        npc: scores?.data?.agents?.[0]?.address,
        au: scores?.data?.agents?.[0]?.au,
        auTotal: scores?.data?.agents?.[0]?.auTotal,
        cycleSpectators: scores?.data?.agents?.[0]?.cycleSpectators,
        activity: (await Promise.all(
          (scores?.data?.agents?.[0]?.activity || [])?.map(async (sc: any) => {
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
    informacion,
    infoCargando,
  };
};

export default useAgent;
