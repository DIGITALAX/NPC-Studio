"use client";

import { useContext } from "react";
import useConfig from "../hooks/useConfig";
import { ModalContext } from "@/app/providers";
import { StudioProps } from "../types/common.types";
import PantallaComprar from "./PantallaComprar";
import useArticulo from "../hooks/useArticulo";

function Studio({
  cargando,
  npc,
  setNpc,
  setCargando,
  dict,
  manejarMostrarArticulo,
  setManejarMostrarArticulo,
}: StudioProps) {
  const contexto = useContext(ModalContext);
  const { gameRef } = useConfig(
    npc,
    contexto?.escena!,
    setNpc,
    setCargando,
    setManejarMostrarArticulo,
    manejarMostrarArticulo,
    contexto?.carrito?.abierto!,
    contexto?.setEscenas!,
    contexto?.escenas!
  );

  const {
    articulosActuales,
    articuloSeleccionado,
    setArticuloSeleccionado,
    articuloIndice,
    setArticuloIndice,
    articuloCargando,
  } = useArticulo(manejarMostrarArticulo);

  return (
    <>
      <div
        ref={gameRef as any}
        className={`relative w-full z-50 h-full flex items-start justify-start ${
          cargando && "animate-pulse"
        }`}
      />
      {(manejarMostrarArticulo || contexto?.carrito.abierto) && (
        <PantallaComprar
          dict={dict}
          articuloCargando={articuloCargando}
          articulosActuales={articulosActuales}
          articuloSeleccionado={articuloSeleccionado}
          setArticuloSeleccionado={setArticuloSeleccionado}
          articuloIndice={articuloIndice}
          setArticuloIndice={setArticuloIndice}
          manejarMostrarArticulo={manejarMostrarArticulo}
          setManejarMostrarArticulo={setManejarMostrarArticulo}
        />
      )}
    </>
  );
}

export default Studio;
