"use client";
import { useTranslations } from "next-intl";
import Dialog from "@/components/game/modules/Dialog";
import Log from "@/components/game/modules/Log";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Scene from "@/components/game/modules/Scene";
import useManage from "@/components/game/hooks/useManage";
import useDialog from "@/components/game/hooks/useDialog";
import dynamic from "next/dynamic";
const Studio = dynamic(() => import("@/components/game/modules/Studio"), {
  ssr: false,
});

export default function IndexPage() {
  const t = useTranslations("Home");
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { npc, setNpc, setEscena, escena, setCargando, cargando } = useManage();
  const {
    indiceMensajeActual,
    handleCompletarTyping,
    setIndiceConversacionActual,
    indiceConversacionActual,
    setIndiceMensajeActual,
    contenedorMensajesRef,
    wrapperRef,
    dragDialog,
    setDragDialog,
  } = useDialog();
  return (
    <div className="relative w-full h-fit min-w-screen flex items-center justify-center flex-col gap-10 min-h-fit md:bg-transparent bg-black md:px-4 md:pt-4">
      <div className="relative w-full xl:h-[692px] h-fit flex items-center justify-center flex-col xl:flex-row gap-6">
        <Log
          t={t}
          connected={isConnected}
          openConnectModal={openConnectModal}
          setDragDialog={setDragDialog}
          indiceMensajeActual={indiceMensajeActual}
          handleCompletarTyping={handleCompletarTyping}
          indiceConversacionActual={indiceConversacionActual}
          contenedorMensajesRef={contenedorMensajesRef}
          cargando={cargando}
        />
        <div
          className="relative w-full xl:w-[1512px] h-[800px] xl:h-full border-cielo md:border-8 flex overflow-hidden rounded-md bg-cielo xl:order-2 order-1"
          id="studioParent"
        >
          <Studio
            npc={npc}
            escena={escena}
            setNpc={setNpc}
            setCargando={setCargando}
            cargando={cargando}
          />
        </div>
      </div>
      <Scene
        npc={npc}
        setNpc={setNpc}
        t={t}
        escena={escena}
        setEscena={setEscena}
      />
      {dragDialog && (
        <Dialog
          setDragDialog={setDragDialog}
          indiceMensajeActual={indiceMensajeActual}
          handleCompletarTyping={handleCompletarTyping}
          setIndiceConversacionActual={setIndiceConversacionActual}
          indiceConversacionActual={indiceConversacionActual}
          setIndiceMensajeActual={setIndiceMensajeActual}
          contenedorMensajesRef={contenedorMensajesRef}
          wrapperRef={wrapperRef}
        />
      )}
    </div>
  );
}
