import { useState } from "react";

const useManage = () => {
  const [escena, setEscena] = useState<string>("oficina");
  const [npc, setNpc] = useState<string>("muchacho");

  return {
    npc,
    setNpc,
    escena,
    setEscena,
  };
};

export default useManage;
