import { useState } from "react";
import { SCENE_LIST } from "../../../../lib/constants";

const useManage = () => {
  const [escena, setEscena] = useState<string>(SCENE_LIST[1]?.key);
  const [npc, setNpc] = useState<number>(0);
  return {
    npc,
    setNpc,
    escena,
    setEscena,
  };
};

export default useManage;
