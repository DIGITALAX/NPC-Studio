import { useEffect, useRef, useState } from "react";
import messages from "./../../../../public/conversation.json";
import Draggable from "react-draggable";

const useDialog = () => {
  const wrapperRef = useRef<Draggable | null>(null);
  const contenedorMensajesRef = useRef<HTMLDivElement | null>(null);
  const [dragDialog, setDragDialog] = useState<boolean>(false);
  const [indiceMensajeActual, setIndiceMensajeActual] = useState<number>(0);
  const [indiceConversacionActual, setIndiceConversacionActual] =
    useState<number>(0);

  useEffect(() => {
    if (indiceMensajeActual >= messages[indiceConversacionActual].length) {
      setTimeout(() => {
        setIndiceConversacionActual((prev) =>
          prev + 1 < messages.length ? prev + 1 : 0
        );

        setIndiceMensajeActual(0);
      }, 6000);
      return;
    }
  }, [indiceMensajeActual, indiceConversacionActual]);

  const handleCompletarTyping = (): void => {
    setTimeout(() => {
      setIndiceMensajeActual(indiceMensajeActual + 1);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (contenedorMensajesRef.current) {
        const contenedor = contenedorMensajesRef.current;
        contenedor.scrollTop = contenedor.scrollHeight;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [indiceMensajeActual]);

  return {
    indiceMensajeActual,
    handleCompletarTyping,
    setIndiceConversacionActual,
    setIndiceMensajeActual,
    indiceConversacionActual,
    contenedorMensajesRef,
    wrapperRef,
    dragDialog,
    setDragDialog,
  };
};

export default useDialog;
