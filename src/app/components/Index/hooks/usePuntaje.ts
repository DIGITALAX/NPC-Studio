import { useState, useEffect, useContext } from "react";
import { Score } from "../types/index.type";
import { getAgentScores } from "../../../../../graphql/queries/getAgentScores";
import { Account, evmAddress } from "@lens-protocol/client";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { ModalContext } from "@/app/providers";

const usePuntaje = () => {
  const contexto = useContext(ModalContext);
  const [puntajeCargando, setPuntajeCargando] = useState<boolean>(false);
  const [historial, setHistorial] = useState<Score[]>([]);
  const profileCache = new Map<string, Account>();

  const manejarHistorial = async () => {
    setPuntajeCargando(true);
    try {
      const datos = await getAgentScores();
      const res = await Promise.all(
        (datos?.data?.agentScores_collection || [])
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
              npc: score?.npc,
              profile,
              scorer: score?.scorer,
              blockTimestamp: score?.blockTimestamp,
              metadata: {
                comment: score?.comment,
                model: Number(score?.model),
                scene: Number(score?.scene),
                chatContext: Number(score?.chatContext),
                appearance: Number(score?.appearance),
                personality: Number(score?.personality),
                training: Number(score?.training),
                lora: Number(score?.lora),
                collections: Number(score?.collections),
                spriteSheet: Number(score?.spriteSheet),
                tokenizer: Number(score?.tokenizer),
                global: Number(score?.global),
              },
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
