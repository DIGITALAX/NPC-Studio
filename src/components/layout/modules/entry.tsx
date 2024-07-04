"use client";
import Dialog from "../../game/modules/Dialog";
import Log from "../../game/modules/Log";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { http, useAccount } from "wagmi";
import Scene from "../../game/modules/Scene";
import useManage from "../../game/hooks/useManage";
import useAccountInternal from "../../game/hooks/useAccount";
import { useContext } from "react";
import { ModalContext } from "../../../app/providers";
import useMint from "../../game/hooks/useMint";
import { Dictionary } from "@/components/game/types/game.types";
import PantallaCambio from "@/components/game/modules/PantallaCambio";
import { polygon } from "viem/chains";
import { createPublicClient } from "viem";
import Carrito from "@/components/compras/modules/Carrito";
import Modals from "@/components/common/modules/Modals";
import usePedidos from "@/components/game/hooks/usePedidos";
import { Post } from "../../../../graphql/generated";

export default function Entry({ dict }: { dict: Dictionary }) {
  const context = useContext(ModalContext);
  const { address, isConnected } = useAccount();
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
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
    wrapperRef,
    dragDialog,
    setDragDialog,
    setIndiceConversacionActual,
    setCitaPublicar,
    citaCargando,
    citaPublicar,
    hacerCita,
    mencionarPerfilesCita,
    setCaretCoordCita,
    setMencionarPerfilesCita,
    setPerfilesAbiertosCita,
    manejarArchivoCita,
    perfilesAbiertosCita,
    caretCoordCita,
    elementoTextoCita,
    aprobado,
    aprobar,
    cargandoColeccion,
    manejarColeccionar,
  } = useManage(
    address,
    publicClient,
    context?.lensConectado!,
    context?.setIndexar!,
    context?.setErrorInteraccion!,
    context?.abrirCita! as Post,
    context?.setAbrirCita! as any,
    context?.seguirColeccionar,
    context?.setSeguirColeccionar!
  );
  const {
    lensCargando,
    manejarLens,
    manejarSalir,
    manejarEnviarMensaje,
    mensaje,
    mensajeCargando,
    setMensaje,
    setOpcionAbierta,
    opcionAbierta,
    manejarGif,
    gifCargando,
    buscarGifs,
    setBuscarGifs,
    monedasDisponibles,
    drops,
    setDrops,
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
    context?.oraculos!,
    context?.setOraculos!
  );
  const {
    manejarMintear,
    mintCargando,
    colecciones,
    setColecciones,
    setColeccionActual,
    coleccionActual,
    manejarArchivo,
    manejarAhorrar,
    setDropDown,
    dropDown,
    ahorrarCargando,
    mostrarGalerias,
    setMostrarGalerias,
    cargandoGalerias,
    todasLasGalerias,
    borrarColeccion,
    borrarGaleria,
    cargandoBorrar,
    conectarPub,
    hacerPublicacion,
    setConectarPub,
    caretCoord,
    setCaretCoord,
    perfilesAbiertos,
    setPerfilesAbiertos,
    mencionarPerfiles,
    setMencionarPerfiles,
    elementoTexto,
    descripcion,
    cargandoConexion,
    setDescripcion,
    indiceImagen,
    setIndiceImagen,
  } = useMint(
    context?.setMint!,
    publicClient,
    address,
    context?.setMostrarNotificacion!,
    context?.lensConectado,
    context?.setIndexar!,
    context?.setErrorInteraccion!
  );

  const {
    todosLosPedidos,
    pedidosCargando,
    manejarDescifrar,
    descifrarCargando,
    setPedidoAbierto,
    pedidoAbierto,
  } = usePedidos(context?.pantalla!, address, context?.cliente!);

  return (
    <div className="relative w-full h-fit min-w-screen flex items-center justify-center flex-col gap-10 min-h-fit md:bg-transparent bg-black md:px-4 md:pt-4">
      <div className="relative w-full h-fit xl:h-[692px] flex items-center justify-center flex-col xl:flex-row gap-6">
        <Log
          setCarrito={context?.setCarrito!}
          setMostrarNotificacion={context?.setMostrarNotificacion!}
          setComentarPublicar={context?.setComentarPublicar!}
          comentarPublicar={context?.comentarPublicar!}
          setOpcionAbierta={setOpcionAbierta}
          connected={isConnected}
          lensConectado={context?.lensConectado!}
          manejarSalir={manejarSalir}
          setVerImagen={context?.setVerImagen!}
          lensCargando={lensCargando}
          manejarLens={manejarLens}
          openConnectModal={openConnectModal}
          cargando={cargando}
          dict={dict}
          setPantalla={context?.setPantalla!}
          address={address}
          publicClient={publicClient}
          setIndexar={context?.setIndexar!}
          setErrorInteraccion={context?.setErrorInteraccion!}
          escena={escena}
          setDragDialog={setDragDialog}
          setAbrirCita={context?.setAbrirCita!}
          setSeguirColeccionar={context?.setSeguirColeccionar!}
        />
        <div
          className="relative w-full xl:w-[1512px] h-[800px] xl:h-full border-cielo md:border-8 flex overflow-hidden rounded-md bg-cielo xl:order-2 order-1"
          id="studioParent"
        >
          <PantallaCambio
            npc={npc}
            indiceImagen={indiceImagen}
            setIndiceImagen={setIndiceImagen}
            pedidoAbierto={pedidoAbierto}
            setPedidoAbierto={setPedidoAbierto}
            setConectarPub={setConectarPub}
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
            manejarAhorrar={manejarAhorrar}
            ahorrarCargando={ahorrarCargando}
            setColecciones={setColecciones}
            setNpc={setNpc}
            cargandoBorrar={cargandoBorrar}
            setCargando={setCargando}
            cargando={cargando}
            manejarMintear={manejarMintear}
            mintCargando={mintCargando}
            dict={dict}
            openConnectModal={openConnectModal}
            setDropDown={setDropDown}
            dropDown={dropDown}
            cargandoGalerias={cargandoGalerias}
            todasLasGalerias={todasLasGalerias}
            borrarColeccion={borrarColeccion}
            borrarGaleria={borrarGaleria}
            publicClient={publicClient}
            address={address}
            todosLosPedidos={todosLosPedidos}
            pedidosCargando={pedidosCargando}
            manejarDescifrar={manejarDescifrar}
            descifrarCargando={descifrarCargando}
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
          setCarrito={context?.setCarrito!}
          setMostrarNotificacion={context?.setMostrarNotificacion!}
          setComentarPublicar={context?.setComentarPublicar!}
          comentarPublicar={context?.comentarPublicar!}
          setOpcionAbierta={setOpcionAbierta}
          setDragDialog={setDragDialog}
          setErrorInteraccion={context?.setErrorInteraccion!}
          setIndiceConversacionActual={setIndiceConversacionActual}
          setIndexar={context?.setIndexar!}
          address={address}
          lensConectado={context?.lensConectado!}
          publicClient={publicClient}
          dict={dict}
          setVerImagen={context?.setVerImagen!}
          escena={escena}
          wrapperRef={wrapperRef}
          setAbrirCita={context?.setAbrirCita!}
          setSeguirColeccionar={context?.setSeguirColeccionar!}
        />
      )}

      <Modals
        aprobado={aprobado}
        aprobar={aprobar}
        cargandoColeccion={cargandoColeccion}
        manejarColeccionar={manejarColeccionar}
        seguirColeccionar={context?.seguirColeccionar!}
        setSeguirColeccionar={context?.setSeguirColeccionar!}
        mencionarPerfilesCita={mencionarPerfilesCita}
        setCaretCoordCita={setCaretCoordCita}
        setMencionarPerfilesCita={setMencionarPerfilesCita}
        setPerfilesAbiertosCita={setPerfilesAbiertosCita}
        manejarArchivoCita={manejarArchivoCita}
        perfilesAbiertosCita={perfilesAbiertosCita}
        caretCoordCita={caretCoordCita}
        setDrops={setDrops}
        drops={drops}
        elementoTextoCita={elementoTextoCita as any}
        setConectarPub={setConectarPub}
        setComentarPublicar={context?.setComentarPublicar!}
        comentarPublicar={context?.comentarPublicar!}
        conectarPub={conectarPub}
        monedasDisponibles={monedasDisponibles}
        hacerPublicacion={hacerPublicacion}
        indexar={context?.indexar!}
        errorInteraccion={context?.errorInteraccion!}
        mostrarNotificacion={context?.mostrarNotificacion!}
        cargandoConexion={cargandoConexion}
        dict={dict}
        setOpcionAbierta={setOpcionAbierta}
        opcionAbierta={opcionAbierta}
        setPerfilesAbiertos={setPerfilesAbiertos}
        setMencionarPerfiles={setMencionarPerfiles}
        lensConectado={context?.lensConectado!}
        setCaretCoord={setCaretCoord}
        elementoTexto={elementoTexto}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        caretCoord={caretCoord}
        perfilesAbiertos={perfilesAbiertos}
        mencionarPerfiles={mencionarPerfiles}
        setErrorInteraccion={context?.setErrorInteraccion!}
        setVerImagen={context?.setVerImagen!}
        coleccionActual={coleccionActual}
        verImagen={context?.verImagen!}
        setMostrarNotificacion={context?.setMostrarNotificacion!}
        mensajeCargando={mensajeCargando}
        manejarEnviarMensaje={manejarEnviarMensaje}
        setMensaje={setMensaje}
        mensaje={mensaje}
        manejarGif={manejarGif}
        gifCargando={gifCargando}
        buscarGifs={buscarGifs}
        setBuscarGifs={setBuscarGifs}
        hacerCita={hacerCita}
        citaPublicar={citaPublicar}
        setCitaPublicar={setCitaPublicar}
        setCitaAbierta={context?.setAbrirCita!}
        citaAbierta={context?.abrirCita!}
        citaCargando={citaCargando}
      />
      <Carrito
        setCarrito={context?.setCarrito!}
        carrito={context?.carrito!}
        dict={dict}
        setManejarMostrarArticulo={setManejarMostrarArticulo}
      />
    </div>
  );
}
