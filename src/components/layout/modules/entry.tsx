"use client";
import Dialog from "../../game/modules/Dialog";
import Log from "../../game/modules/Log";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { http, useAccount } from "wagmi";
import Scene from "../../game/modules/Scene";
import useManage from "../../game/hooks/useManage";
import useDialog from "../../game/hooks/useDialog";
import useAccountInternal from "../../game/hooks/useAccount";
import { useContext } from "react";
import { ModalContext } from "../../../app/providers";
import useMint from "../../game/hooks/useMint";
import { Dictionary } from "@/components/game/types/game.types";
import PantallaCambio from "@/components/game/modules/PantallaCambio";
import Notificacion from "@/components/game/modules/Notificacion";
import { polygon } from "viem/chains";
import { createPublicClient } from "viem";

export default function Entry({ dict }: { dict: Dictionary }) {
  const context = useContext(ModalContext);
  const { address, isConnected } = useAccount();
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_AMOY_KEY}`
    ),
  });
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { npc, setNpc, setEscena, escena, setCargando, cargando } = useManage();
  console.log(context?.mostrarNotificacion);
  const { lensCargando, manejarLens, manejarSalir } = useAccountInternal(
    isConnected,
    context?.setEsArtista!,
    context?.setLensConectado!,
    openAccountModal,
    address,
    publicClient
  );
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
  const { manejarMintear, mintCargando } = useMint(context?.setMint!);
  return (
    <div className="relative w-full h-fit min-w-screen flex items-center justify-center flex-col gap-10 min-h-fit md:bg-transparent bg-black md:px-4 md:pt-4">
      <div className="relative w-full h-fit xl:h-[692px] flex items-center justify-center flex-col xl:flex-row gap-6">
        <Log
          setMint={context?.setMint!}
          connected={isConnected}
          lensConectado={context?.lensConectado!}
          manejarSalir={manejarSalir}
          lensCargando={lensCargando}
          manejarLens={manejarLens}
          openConnectModal={openConnectModal}
          setDragDialog={setDragDialog}
          indiceMensajeActual={indiceMensajeActual}
          handleCompletarTyping={handleCompletarTyping}
          indiceConversacionActual={indiceConversacionActual}
          contenedorMensajesRef={contenedorMensajesRef}
          cargando={cargando}
          dict={dict}
          setPantalla={context?.setPantalla!}
        />
        <div
          className="relative w-full xl:w-[1512px] h-[800px] xl:h-full border-cielo md:border-8 flex overflow-hidden rounded-md bg-cielo xl:order-2 order-1"
          id="studioParent"
        >
          <PantallaCambio
            npc={npc}
            isConnected={isConnected}
            escena={escena}
            setNpc={setNpc}
            setCargando={setCargando}
            cargando={cargando}
            pantalla={context?.pantalla!}
            setMint={context?.setMint!}
            mint={Number(context?.mint)}
            manejarMintear={manejarMintear}
            mintCargando={mintCargando}
            dict={dict}
            setMostrarNotificacion={context?.setMostrarNotificacion!}
            openConnectModal={openConnectModal}
            esArtista={context?.esArtista!}
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
      {context?.mostrarNotificacion && (
        <Notificacion
          dict={dict}
          setMostrarNotificacion={context?.setMostrarNotificacion!}
        />
      )}
    </div>
  );
}
