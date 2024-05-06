import { useState } from "react";
import { SCENE_LIST } from "../../../../lib/constants";

const useManage = () => {
  const [escena, setEscena] = useState<string>(SCENE_LIST[0]?.key);
  const [npc, setNpc] = useState<string>(SCENE_LIST[0]?.sprites?.[0]?.key);
  return {
    npc,
    setNpc,
    escena,
    setEscena,
  };
};

export default useManage;
