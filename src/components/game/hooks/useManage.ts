import { useState } from "react";

const useManage = () => {
  const [escena, setEscena] = useState<number>(0);
  const [npc, setNpc] = useState<number>(0);

  return {
    npc,
    setNpc,
    escena,
    setEscena,
  };
};

export default useManage;
