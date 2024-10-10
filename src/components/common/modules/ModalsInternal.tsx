"use client";
import { useContext } from "react";
import {
  Indexar,
  Notificacion as NotificacionType,
} from "../types/common.types";
import Notificacion from "./Notificacion";
import VerMedios from "./VerMedios";
import Error from "./Error";
import Index from "./Index";
import PublicacionConectada from "./PublicacionConectada";
import OpcionAbierta from "./OpcionAbierta";
import CitaPub from "./CitaPub";
import Seguir from "./Seguir";
import Interacciones from "./Interacciones";
import Perfil from "./Perfil";
import { ModalContext } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { polygon } from "viem/chains";
import { createPublicClient, http } from "viem";
import useGifs from "@/components/game/hooks/useGifs";
import useAccountInternal from "../../game/hooks/useAccount";
import { Post } from "../../../../graphql/generated";
import { Dictionary } from "@/components/game/types/game.types";
import usePublicar from "@/components/game/hooks/usePublicar";
import useElements from "@/components/game/hooks/useElements";
import Voto from "./Voto";

export default function ModalsInternal({ dict }: { dict: Dictionary }) {
  const context = useContext(ModalContext);
  const router = useRouter();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected: conectado } = useAccount();
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  });
  const {
    hacerPublicacion,
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
  } = usePublicar(
    publicClient,
    address,
    context?.setIndexar!,
    context?.setErrorInteraccion!,
    context?.coleccionActual!,
    context?.setConectarPub!
  );
  const { manejarLens, opcionAbierta, setOpcionAbierta } = useAccountInternal(
    conectado,
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
  } = useElements(
    address,
    publicClient,
    context?.lensConectado!,
    context?.setIndexar!,
    context?.setErrorInteraccion!,
    context?.abrirCita! as Post,
    context?.setAbrirCita! as any,
    context?.seguirColeccionar,
    context?.setSeguirColeccionar!,
    conectado,
    openConnectModal,
    manejarLens,
    context?.escena!
  );
  const {
    manejarEnviarMensaje,
    mensajeCargando,
    setMensaje,
    mensaje,
    manejarGif,
    buscarGifs,
    setBuscarGifs,
    gifCargando,
    monedasDisponibles,
    drops,
    setDrops,
  } = useGifs(address, dict, context?.oraculos!, context?.setOraculos!);

  return (
    <>
      {context?.mostrarPerfil && (
        <Perfil
          lensConectado={context?.lensConectado}
          escenas={context?.escenas!}
          setErrorInteraccion={context?.setErrorInteraccion!}
          setIndexar={context?.setIndexar!}
          publicClient={publicClient}
          mostrarPerfil={context?.mostrarPerfil!}
          setMostrarPerfil={context?.setMostrarPerfil!}
          dict={dict}
        />
      )}
      {context?.mostrarInteracciones?.abierto && (
        <Interacciones
          router={router}
          setMostrarPerfil={context?.setMostrarPerfil!}
          dict={dict}
          setCarrito={context?.setCarrito}
          setAbrirCita={context?.setAbrirCita}
          publicClient={publicClient}
          address={address!}
          manejarLens={manejarLens}
          escena={context?.escena!}
          conectado={conectado}
          openConnectModal={openConnectModal}
          setIndexar={context?.setIndexar!}
          setComentarPublicar={context?.setComentarPublicar!}
          setErrorInteraccion={context?.setErrorInteraccion!}
          setMostrarNotificacion={context?.setMostrarNotificacion!}
          setOpcionAbierta={setOpcionAbierta!}
          setSeguirColeccionar={context?.setSeguirColeccionar!}
          setVerImagen={context?.setVerImagen!}
          comentarPublicar={context?.comentarPublicar!}
          mostrarInteracciones={context?.mostrarInteracciones!}
          setMostrarInteracciones={context?.setMostrarInteracciones!}
          lensConectado={context?.lensConectado!}
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
      {context?.conectarPub && (
        <PublicacionConectada
          coleccionActual={context?.coleccionActual!}
          hacerPublicacion={hacerPublicacion}
          setConectarPub={context?.setConectarPub!}
          cargandoConexion={cargandoConexion}
          dict={dict}
          setPerfilesAbiertos={setPerfilesAbiertos}
          setMencionarPerfiles={setMencionarPerfiles}
          lensConectado={context?.lensConectado}
          setCaretCoord={setCaretCoord}
          elementoTexto={elementoTexto}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          caretCoord={caretCoord}
          perfilesAbiertos={perfilesAbiertos}
          mencionarPerfiles={mencionarPerfiles}
        />
      )}
      {context?.verImagen?.abierto && (
        <VerMedios
          setVerImagen={context?.setVerImagen!}
          verImagen={context?.verImagen!}
        />
      )}

      {context?.abrirCita && (
        <CitaPub
          setMostrarPerfil={context?.setMostrarPerfil!}
          dict={dict}
          setCitaAbierta={context?.setAbrirCita}
          hacerCita={hacerCita}
          citaPublicar={citaPublicar?.[0]}
          setCitaPublicar={setCitaPublicar}
          citaCargando={citaCargando}
          citaAbierta={context?.abrirCita}
          setOpcionAbierta={setOpcionAbierta}
          setCaretCoord={setCaretCoordCita}
          mencionarPerfiles={mencionarPerfilesCita}
          manejarArchivo={manejarArchivoCita}
          setMencionarPerfiles={setMencionarPerfilesCita}
          setPerfilesAbiertos={setPerfilesAbiertosCita}
          perfilesAbiertos={perfilesAbiertosCita}
          caretCoord={caretCoordCita}
          elementoTexto={elementoTextoCita!}
          lensConectado={context?.lensConectado}
        />
      )}
      {opcionAbierta && (
        <OpcionAbierta
          setDrops={setDrops}
          drops={drops}
          opcionAbierta={opcionAbierta}
          setOpcionAbierta={setOpcionAbierta}
          dict={dict}
          monedasDisponibles={monedasDisponibles}
          setComentarPublicar={
            context?.abrirCita ? setCitaPublicar : context?.setComentarPublicar!
          }
          comentarPublicar={
            context?.abrirCita
              ? citaPublicar?.[0]
              : context?.comentarPublicar?.[opcionAbierta?.indice]!
          }
          manejarGif={manejarGif}
          gifCargando={gifCargando}
          setBuscarGifs={setBuscarGifs}
          buscarGifs={buscarGifs}
        />
      )}
      {context?.seguirColeccionar && (
        <Seguir
          dict={dict}
          aprobado={aprobado}
          aprobar={aprobar}
          manejarColeccionar={manejarColeccionar}
          cargandoColeccion={cargandoColeccion}
          seguirColeccionar={context?.seguirColeccionar}
          setSeguirColeccionar={context?.setSeguirColeccionar}
        />
      )}
      {context?.voto && <Voto dict={dict} setVoto={context?.setVoto!} />}
      {context?.indexar !== Indexar.Inactivo && (
        <Index dict={dict} tipo={context?.indexar!} />
      )}
      {context?.errorInteraccion && (
        <Error
          dict={dict}
          setErrorInteraccion={context?.setErrorInteraccion!}
        />
      )}
    </>
  );
}
