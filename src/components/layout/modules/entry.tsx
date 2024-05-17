"use client";
import Dialog from "../../game/modules/Dialog";
import Log from "../../game/modules/Log";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Scene from "../../game/modules/Scene";
import useManage from "../../game/hooks/useManage";
import useDialog from "../../game/hooks/useDialog";
import dynamic from "next/dynamic";
import { useContext } from "react";
import Mint from "../../game/modules/Mint";
import { ModalContext } from "../../../app/providers";
import useMint from "../../game/hooks/useMint";
import { Dictionary } from "@/components/game/types/game.types";
const Studio = dynamic(() => import("../../game/modules/Studio"), {
  ssr: false,
});

export default function Entry({ dict }: { dict: Dictionary }) {
  const context = useContext(ModalContext);
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
  const { manejarMintear, mintCargando } = useMint(context?.setArtists!);
  return (
    <div className="relative w-full h-fit min-w-screen flex items-center justify-center flex-col gap-10 min-h-fit md:bg-transparent bg-black md:px-4 md:pt-4">
      <div className="relative w-full h-fit xl:h-[692px] flex items-center justify-center flex-col xl:flex-row gap-6">
        <Log
          setArtists={context?.setArtists!}
          connected={isConnected}
          openConnectModal={openConnectModal}
          setDragDialog={setDragDialog}
          indiceMensajeActual={indiceMensajeActual}
          handleCompletarTyping={handleCompletarTyping}
          indiceConversacionActual={indiceConversacionActual}
          contenedorMensajesRef={contenedorMensajesRef}
          cargando={cargando}
          dict={dict}
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
        dict={dict}
        npc={npc}
        setNpc={setNpc}
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
      {Number(context?.artists) > 0 && (
        <Mint
          setArtists={context?.setArtists!}
          artists={Number(context?.artists)}
          manejarMintear={manejarMintear}
          mintCargando={mintCargando}
          dict={dict}
        />
      )}
    </div>
  );
}
