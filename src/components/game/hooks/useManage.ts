import { SetStateAction, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { AutographType, ComentarPublicar } from "../types/game.types";

const useManage = (
  setComentarPublicar: (e: SetStateAction<ComentarPublicar[]>) => void,
  setEscena: (e: SetStateAction<string | undefined>) => void,
  escena: string
) => {
  const [npc, setNpc] = useState<string | undefined>("Gabriel");
  const [cargando, setCargando] = useState<boolean>(true);
  const [manejarMostrarArticulo, setManejarMostrarArticulo] = useState<{
    etiqueta: string;
    tipo: AutographType;
    disenadores: string[];
  }>();
  const wrapperRef = useRef<Draggable | null>(null);
  const [dragDialog, setDragDialog] = useState<boolean>(false);
  const [indiceConversacionActual, setIndiceConversacionActual] =
    useState<number>(0);

  const manejarMensaje = (handle: string) => {
    setComentarPublicar((prev) => {
      const c = [...prev];
      c[0] = {
        ...c?.[0],
        contenido: handle,
      };

      return c;
    });
    setDragDialog(true);
  };

  useEffect(() => {
    if (!escena) {
      setEscena(
        localStorage?.getItem("escena") !== "" &&
          localStorage?.getItem("escena") !== null &&
          localStorage?.getItem("escena") !== undefined
          ? (localStorage?.getItem("escena") as string)
          : "estudio abierto de trabajo"
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
    indiceConversacionActual,
    setIndiceConversacionActual,
    manejarMensaje,
  };
};

export default useManage;
