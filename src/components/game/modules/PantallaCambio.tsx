import { PantallaCambioProps } from "../types/game.types";
const Studio = dynamic(() => import("../../game/modules/Studio"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import Pedidos from "./Pedidos";
import Process from "./Process";
import { useContext } from "react";
import { ModalContext } from "@/app/providers";
import useConversacion from "@/components/compras/hooks/useConversacion";

function PantallaCambio({
  npc,
  escena,
  setNpc,
  setCargando,
  cargando,
  dict,
  manejarMintear,
  mintCargando,
  isConnected,
  openConnectModal,
  cargandoBorrar,
  colecciones,
  setColeccionActual,
  coleccionActual,
  manejarArchivo,
  manejarAhorrar,
  setColecciones,
  setDropDown,
  dropDown,
  mostrarGalerias,
  setMostrarGalerias,
  cargandoGalerias,
  todasLasGalerias,
  borrarColeccion,
  borrarGaleria,
  ahorrarCargando,
  manejarMostrarArticulo,
  setManejarMostrarArticulo,
  publicClient,
  address,
  setConectarPub,
  todosLosPedidos,
  pedidosCargando,
  manejarDescifrar,
  descifrarCargando,
  pedidoAbierto,
  setIndiceImagen,
  indiceImagen,
  setPedidoAbierto,
}: PantallaCambioProps) {
  const context = useContext(ModalContext);
  const {
    enviarMensaje,
    mensajeCargando,
    conversacion,
    conversacionCargando,
    abierta,
    setAbierta,
    setMensaje,
    mensaje,
    mensajeRef,
  } = useConversacion(context?.lensConectado, address, context?.pantalla!);

  switch (context?.pantalla) {
    case 1:
      return (
        <Process
          escenas={context?.escenas}
          setIndiceImagen={setIndiceImagen}
          indiceImagen={indiceImagen}
          setConectarPub={setConectarPub}
          borrarColeccion={borrarColeccion}
          borrarGaleria={borrarGaleria}
          mostrarGalerias={mostrarGalerias}
          setMostrarGalerias={setMostrarGalerias}
          setDropDown={setDropDown}
          cargandoGalerias={cargandoGalerias}
          todasLasGalerias={todasLasGalerias}
          dropDown={dropDown}
          setMint={context?.setMint!}
          mint={Number(context?.mint)}
          manejarMintear={manejarMintear}
          mintCargando={mintCargando}
          dict={dict}
          setMostrarNotificacion={context?.setMostrarNotificacion!}
          esArtista={context?.esArtista}
          isConnected={isConnected}
          openConnectModal={openConnectModal}
          colecciones={colecciones}
          setColeccionActual={setColeccionActual}
          coleccionActual={coleccionActual}
          manejarArchivo={manejarArchivo}
          manejarAhorrar={manejarAhorrar}
          cargandoBorrar={cargandoBorrar}
          setColecciones={setColecciones}
          ahorrarCargando={ahorrarCargando}
        />
      );

    case 2:
      return (
        <Pedidos
          address={address}
          dict={dict}
          todosLosPedidos={todosLosPedidos}
          pedidosCargando={pedidosCargando}
          manejarDescifrar={manejarDescifrar}
          descifrarCargando={descifrarCargando}
          pedidoAbierto={pedidoAbierto}
          setPedidoAbierto={setPedidoAbierto}
          enviarMensaje={enviarMensaje}
          mensajeCargando={mensajeCargando}
          conversacion={conversacion}
          conversacionCargando={conversacionCargando}
          abierta={abierta}
          setAbierta={setAbierta}
          setMensaje={setMensaje}
          mensaje={mensaje}
          mensajeRef={mensajeRef}
        />
      );

    default:
      return (
        <Studio
          npc={npc}
          escenas={context?.escenas!}
          setEscenas={context?.setEscenas!}
          dict={dict}
          escena={escena}
          manejarMostrarArticulo={manejarMostrarArticulo}
          setManejarMostrarArticulo={setManejarMostrarArticulo}
          setNpc={setNpc}
          setCargando={setCargando}
          cargando={cargando}
          publicClient={publicClient}
          cliente={context?.cliente!}
          setMostrarNotificacion={context?.setMostrarNotificacion!}
          address={address}
          lensConectado={context?.lensConectado!}
          setCarrito={context?.setCarrito!}
          setErrorInteraccion={context?.setErrorInteraccion!}
          setIndexar={context?.setIndexar!}
          setVerImagen={context?.setVerImagen!}
          carrito={context?.carrito!}
          datosOraculos={context?.oraculos!}
        />
      );
  }
}

export default PantallaCambio;
