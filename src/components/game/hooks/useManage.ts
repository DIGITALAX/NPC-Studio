import { useRef, useState } from "react";
import { SCENE_LIST } from "../../../lib/constants";
import Draggable from "react-draggable";
import { AutographType } from "../types/game.types";

const useManage = () => {
  const [escena, setEscena] = useState<string>(SCENE_LIST[0]?.key);
  const [npc, setNpc] = useState<string>(SCENE_LIST[0]?.sprites?.[0]?.key);
  const [cargando, setCargando] = useState<boolean>(false);
  const [manejarMostrarArticulo, setManejarMostrarArticulo] = useState<{
    etiqueta: string;
    tipo: AutographType;
    disenador: string;
  }>();
  const wrapperRef = useRef<Draggable | null>(null);
  const [dragDialog, setDragDialog] = useState<boolean>(false);
  const [indiceConversacionActual, setIndiceConversacionActual] =
    useState<number>(0);

  return {
    npc,
    setNpc,
    escena,
    setEscena,
    cargando,
    setCargando,
    setManejarMostrarArticulo,
    manejarMostrarArticulo,
    wrapperRef,
    dragDialog,
    setDragDialog,
    indiceConversacionActual,
    setIndiceConversacionActual,
  };
};

export default useManage;
