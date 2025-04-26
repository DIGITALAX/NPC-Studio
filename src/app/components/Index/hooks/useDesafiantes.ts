import { useEffect, useState } from "react";
import { AgentDetails } from "../types/index.type";

const useDesafiantes = (agentCollections: AgentDetails[]) => {
  const [desafiantes, setDesafiantes] = useState<AgentDetails[]>([]);

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
