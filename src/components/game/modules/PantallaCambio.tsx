import { PantallaCambioProps } from "../types/game.types";
const Studio = dynamic(() => import("../../game/modules/Studio"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import Pedidos from "./Pedidos";
import Process from "./Process";
import { useContext } from "react";
import { ModalContext } from "@/app/providers";

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
  manejarAhorar,
  setColecciones,
  setDropDown,
  dropDown,
  mostrarGalerias,
  setMostrarGalerias,
  cargandoGalerias,
  todasLasGalerias,
  borrarColeccion,
  borrarGaleria,
  manejarMostrarArticulo,
  setManejarMostrarArticulo,
  publicClient,
  address,
  setConectarPub,
}: PantallaCambioProps) {
  const context = useContext(ModalContext);

  switch (context?.pantalla) {
    case 1:
      return (
        <Process
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
          manejarAhorar={manejarAhorar}
          cargandoBorrar={cargandoBorrar}
          setColecciones={setColecciones}
        />
      );

    case 2:
      return <Pedidos />;

    default:
      return (
        <Studio
          npc={npc}
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
