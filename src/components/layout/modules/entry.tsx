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
import Notificacion from "@/components/common/modules/Notificacion";
import {
  Indexar,
  Notificacion as NotificacionType,
} from "@/components/common/types/common.types";
import { polygon } from "viem/chains";
import { createPublicClient } from "viem";
import Index from "@/components/common/modules/Index";
import Error from "@/components/common/modules/Error";

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
  const {
    npc,
    setNpc,
    setEscena,
    escena,
    setCargando,
    cargando,
    manejarMostrarArticulo,
    setManejarMostrarArticulo,
  } = useManage();
  const {
    lensCargando,
    manejarLens,
    manejarSalir,
    manejarEnviarMensaje,
    mensaje,
    mensajeCargando,
    setMensaje,
  } = useAccountInternal(
    isConnected,
    context?.setEsArtista!,
    context?.setLensConectado!,
    openAccountModal,
    context?.setMostrarNotificacion!,
    address,
    publicClient,
    dict,
    context?.lensConectado,
    context?.oracles!,
    context?.setOracles!
  );
  const {
    setIndiceConversacionActual,
    indiceConversacionActual,
    contenedorMensajesRef,
    wrapperRef,
    dragDialog,
    setDragDialog,
    setPerfilesAbiertos,
    setMencionarPerfiles,
    setCaretCoord,
    setComentarPublicar,
    perfilesAbiertos,
    caretCoord,
    comentarPublicar,
    mencionarPerfiles,
    publicacionCargando,
    manejarPublicar,
  } = useDialog(
    address,
    publicClient,
    context?.setIndexar!,
    context?.setErrorInteraccion!,
    escena
  );
  const {
    manejarMintear,
    mintCargando,
    colecciones,
    setColecciones,
    setColeccionActual,
    coleccionActual,
    manejarArchivo,
    manejarAhorar,
    setDropDown,
    dropDown,
    mostrarGalerias,
    setMostrarGalerias,
    cargandoGalerias,
    todasLasGalerias,
    borrarColeccion,
    borrarGaleria,
    cargandoBorrar,
  } = useMint(
    context?.setMint!,
    publicClient,
    address,
    context?.setMostrarNotificacion!
  );
  return (
    <div className="relative w-full h-fit min-w-screen flex items-center justify-center flex-col gap-10 min-h-fit md:bg-transparent bg-black md:px-4 md:pt-4">
      <div className="relative w-full h-fit xl:h-[692px] flex items-center justify-center flex-col xl:flex-row gap-6">
        <Log
          manejarPublicar={manejarPublicar}
          connected={isConnected}
          lensConectado={context?.lensConectado!}
          manejarSalir={manejarSalir}
          lensCargando={lensCargando}
          manejarLens={manejarLens}
          openConnectModal={openConnectModal}
          setDragDialog={setDragDialog}
          contenedorMensajesRef={contenedorMensajesRef}
          cargando={cargando}
          dict={dict}
          setPantalla={context?.setPantalla!}
          setPerfilesAbiertos={setPerfilesAbiertos}
          setMencionarPerfiles={setMencionarPerfiles}
          setCaretCoord={setCaretCoord}
          setComentarPublicar={setComentarPublicar}
          perfilesAbiertos={perfilesAbiertos[0]}
          caretCoord={caretCoord}
          comentarPublicar={comentarPublicar[0]}
          mencionarPerfiles={mencionarPerfiles}
          publicacionCargando={publicacionCargando}
        />
        <div
          className="relative w-full xl:w-[1512px] h-[800px] xl:h-full border-cielo md:border-8 flex overflow-hidden rounded-md bg-cielo xl:order-2 order-1"
          id="studioParent"
        >
          <PantallaCambio
            npc={npc}
            manejarMostrarArticulo={manejarMostrarArticulo}
            setManejarMostrarArticulo={setManejarMostrarArticulo}
            mostrarGalerias={mostrarGalerias}
            setMostrarGalerias={setMostrarGalerias}
            isConnected={isConnected}
            escena={escena}
            colecciones={colecciones}
            setColeccionActual={setColeccionActual}
            coleccionActual={coleccionActual}
            manejarArchivo={manejarArchivo}
            manejarAhorar={manejarAhorar}
            setColecciones={setColecciones}
            setNpc={setNpc}
            cargandoBorrar={cargandoBorrar}
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
            setDropDown={setDropDown}
            dropDown={dropDown}
            cargandoGalerias={cargandoGalerias}
            todasLasGalerias={todasLasGalerias}
            borrarColeccion={borrarColeccion}
            borrarGaleria={borrarGaleria}
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
          manejarPublicar={manejarPublicar}
          setDragDialog={setDragDialog}
          contenedorMensajesRef={contenedorMensajesRef}
          wrapperRef={wrapperRef}
          setIndiceConversacionActual={setIndiceConversacionActual}
          indiceConversacionActual={indiceConversacionActual}
          setPerfilesAbiertos={setPerfilesAbiertos}
          setMencionarPerfiles={setMencionarPerfiles}
          setCaretCoord={setCaretCoord}
          setComentarPublicar={setComentarPublicar}
          perfilesAbiertos={perfilesAbiertos[0]}
          caretCoord={caretCoord}
          comentarPublicar={comentarPublicar[0]}
          mencionarPerfiles={mencionarPerfiles}
          lensConectado={context?.lensConectado!}
          dict={dict}
          publicacionCargando={publicacionCargando}
        />
      )}
      {context?.mostrarNotificacion !== NotificacionType.Inactivo && (
        <Notificacion
          dict={dict}
          tipo={context?.mostrarNotificacion!}
          setMostrarNotificacion={context?.setMostrarNotificacion!}
          mensajeCargando={mensajeCargando}
          manejarEnviarMensaje={manejarEnviarMensaje}
          setMensaje={setMensaje}
          mensaje={mensaje}
        />
      )}
      {context?.indexar !== Indexar.Inactivo && (
        <Index dict={dict} tipo={context?.indexar!} />
      )}
      {context?.errorInteraccion && (
        <Error
          dict={dict}
          setErrorInteraccion={context?.setErrorInteraccion!}
        />
      )}
    </div>
  );
}
