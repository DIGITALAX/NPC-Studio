"use client";
import Dialog from "../../game/modules/Dialog";
import Log from "../../game/modules/Log";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { http, useAccount } from "wagmi";
import Scene from "../../game/modules/Scene";
import useManage from "../../game/hooks/useManage";
import useAccountInternal from "../../game/hooks/useAccount";
import { SetStateAction, useContext } from "react";
import { ModalContext } from "../../../app/providers";
import useMint from "../../game/hooks/useMint";
import { Dictionary } from "@/components/game/types/game.types";
import PantallaCambio from "@/components/game/modules/PantallaCambio";
import { polygon } from "viem/chains";
import { createPublicClient } from "viem";
import Carrito from "@/components/compras/modules/Carrito";
import usePedidos from "@/components/game/hooks/usePedidos";
import { useRouter } from "next/navigation";

export default function Entry({ dict }: { dict: Dictionary }) {
  const context = useContext(ModalContext);
  const { address, isConnected } = useAccount();
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  });
  const router = useRouter();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { manejarLens, setOpcionAbierta, lensCargando, manejarSalir } =
    useAccountInternal(
      isConnected,
      context?.setEsArtista!,
      context?.setLensConectado!,
      context?.setMostrarNotificacion!,
      address,
      publicClient,
      context?.lensConectado,
      context?.setOraculos!,
      openAccountModal
    );
  const {
    npc,
    setNpc,
    setCargando,
    cargando,
    manejarMostrarArticulo,
    setManejarMostrarArticulo,
    wrapperRef,
    dragDialog,
    setDragDialog,
    setIndiceConversacionActual,
    manejarMensaje,
  } = useManage(
    context?.setComentarPublicar!,
    context?.setEscena!,
    context?.escena!
  );
  const {
    manejarMintear,
    mintCargando,
    colecciones,
    setColecciones,
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
    indiceImagen,
    setIndiceImagen,
  } = useMint(
    context?.setMint!,
    publicClient,
    address,
    context?.setMostrarNotificacion!,
    context?.lensConectado,
    context?.escenas!,
    context?.coleccionActual!,
    context?.setColeccionActual!
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
          setMostrarPerfil={context?.setMostrarPerfil!}
          setCarrito={context?.setCarrito!}
          setMostrarInteracciones={context?.setMostrarInteracciones!}
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
          escena={context?.escena!}
          setDragDialog={setDragDialog}
          setAbrirCita={context?.setAbrirCita!}
          setSeguirColeccionar={context?.setSeguirColeccionar!}
          npcIds={
            context?.escenas
              ?.find((es) => es.clave == context?.escena)
              ?.sprites?.map((s) =>
                s.perfil_id.toString(16).replaceAll("0x", "0x0")
              )!
          }
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
            setConectarPub={context?.setConectarPub!}
            manejarMostrarArticulo={manejarMostrarArticulo}
            setManejarMostrarArticulo={setManejarMostrarArticulo}
            mostrarGalerias={mostrarGalerias}
            setMostrarGalerias={setMostrarGalerias}
            isConnected={isConnected}
            escena={context?.escena!}
            colecciones={colecciones}
            setColeccionActual={context?.setColeccionActual!}
            coleccionActual={context?.coleccionActual!}
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
        manejarMensaje={manejarMensaje}
        lensConectado={context?.lensConectado}
        escena={context?.escena!}
        setEscena={context?.setEscena as (e: SetStateAction<string>) => void}
        escenas={context?.escenas!}
        publicClient={publicClient}
        setIndexar={context?.setIndexar!}
        setErrorInteraccion={context?.setErrorInteraccion!}
      />
      {dragDialog && (
        <Dialog
          router={router}
          setMostrarPerfil={context?.setMostrarPerfil!}
          setMostrarInteracciones={context?.setMostrarInteracciones!}
          npcIds={
            context?.escenas
              ?.find((es) => es.clave == context?.escena)
              ?.sprites?.map((s) =>
                s.perfil_id.toString(16).replaceAll("0x", "0x0")
              )!
          }
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
          escena={context?.escena!}
          conectado={isConnected}
          manejarLens={manejarLens}
          openConnectModal={openConnectModal}
          wrapperRef={wrapperRef}
          setAbrirCita={context?.setAbrirCita!}
          setSeguirColeccionar={context?.setSeguirColeccionar!}
        />
      )}
      <Carrito
        setCarrito={context?.setCarrito!}
        carrito={context?.carrito!}
        dict={dict}
        setManejarMostrarArticulo={setManejarMostrarArticulo}
      />
    </div>
  );
}
