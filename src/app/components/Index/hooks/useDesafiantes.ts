import { useEffect, useState } from "react";
import { Coleccion, Sprite } from "../../Common/types/common.types";
import { AgentScore } from "../types/index.type";
import { AccountStats } from "@lens-protocol/client";

const useDesafiantes = (
  agentCollections: (Sprite & {
    collections?: Coleccion[];
    historial?: AgentScore & {
      stats?: AccountStats;
    };
  })[]
) => {
  const [desafiantes, setDesafiantes] = useState<
    (Sprite & {
      collections?: Coleccion[];
      historial?: AgentScore & {
        stats?: AccountStats;
      };
    })[]
  >([]);

  useEffect(() => {
    if (agentCollections?.length > 0) {
      setDesafiantes(agentCollections?.slice(0, 2));
    }
  }, [agentCollections]);

  return {
    desafiantes,
    setDesafiantes,
  };
};

export default useDesafiantes;
