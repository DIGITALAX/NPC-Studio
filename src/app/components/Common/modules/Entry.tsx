"use client";

import { useContext } from "react";
import { ModalContext } from "@/app/providers";
import { useRouter } from "next/navigation";
import Carrito from "./Carrito";
import Scene from "./Scene";
import PantallaCambio from "./PantallaCambio";
import useManage from "../hooks/useManage";
import Log from "./Log";
import Dialog from "../../Chat/modules/Dialog";

export default function Entry({ dict, lang }: { dict: any; lang: string }) {
  const contexto = useContext(ModalContext);
  const router = useRouter();
  const {
    setManejarMostrarArticulo,
    npc,
    setCargando,
    setNpc,
    cargando,
    manejarMostrarArticulo,
    setDragDialog,
    wrapperRef,
    dragDialog,
  } = useManage(contexto?.setEscena!, contexto?.escena!);

  return (
    <div className="relative w-full h-fit min-w-screen flex items-center justify-center flex-col gap-10 min-h-fit md:bg-transparent bg-black md:px-4 md:pt-4">
      <div className="relative w-full h-fit xl:h-[692px] flex items-center justify-center flex-col xl:flex-row gap-6">
        <div className="relative items-center justify-center flex w-full xl:w-fit h-fit xl:h-full">
        <Log
          cargando={cargando}
          dict={dict}
          router={router}
          setDragDialog={setDragDialog}
        />
        </div>
        <div
          className="relative w-full xl:w-[1512px] h-[800px] xl:h-full border-cielo md:border-8 flex overflow-hidden rounded-md bg-cielo xl:order-2 order-1"
          id="studioParent"
        >
          <PantallaCambio
            dict={dict}
            manejarMostrarArticulo={manejarMostrarArticulo}
            setManejarMostrarArticulo={setManejarMostrarArticulo}
            cargando={cargando}
            setCargando={setCargando}
            npc={npc}
            setNpc={setNpc}
          />
        </div>
      </div>
      <Scene dict={dict} npc={npc} setNpc={setNpc} />
      {dragDialog && (
        <Dialog
          setDragDialog={setDragDialog}
          dict={dict}
          wrapperRef={wrapperRef}
          router={router}
        />
      )}
      <Carrito
        dict={dict}
        setManejarMostrarArticulo={setManejarMostrarArticulo}
      />
    </div>
  );
}
