import { SetStateAction, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { AutographType } from "../types/common.types";

const useManage = (
  setEscena: (e: SetStateAction<string | undefined>) => void,
  escena: string
) => {
  const [npc, setNpc] = useState<string | undefined>(
    "0x532c13e55F7443A39c8035f3CA2Cbe3Cd4557311"
  );
  const [cargando, setCargando] = useState<boolean>(true);
  const [manejarMostrarArticulo, setManejarMostrarArticulo] = useState<{
    etiqueta: string;
    tipo: AutographType;
    disenadores: string[];
  }>();
  const wrapperRef = useRef<Draggable | null>(null);
  const [dragDialog, setDragDialog] = useState<boolean>(false);

  useEffect(() => {
    if (!escena) {
      setEscena(
        localStorage?.getItem("escena") !== "" &&
          localStorage?.getItem("escena") !== null &&
          localStorage?.getItem("escena") !== undefined
          ? (localStorage?.getItem("escena") as string)
          : // : "estudio abierto de trabajo"
            "ático de intercambio de varianza"
      );
    }
  }, []);

  return {
    npc,
    setNpc,
    cargando,
    setCargando,
    setManejarMostrarArticulo,
    manejarMostrarArticulo,
    wrapperRef,
    dragDialog,
    setDragDialog,
  };
};

export default useManage;
