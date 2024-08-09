import { FunctionComponent } from "react";
import {
  Indexar,
  ModalsProps,
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

const Modals: FunctionComponent<ModalsProps> = ({
  dict,
  monedasDisponibles,
  setErrorInteraccion,
  drops,
  setDrops,
  setVerImagen,
  seguirColeccionar,
  setSeguirColeccionar,
  setOpcionAbierta,
  opcionAbierta,
  verImagen,
  coleccionActual,
  setMostrarNotificacion,
  mensajeCargando,
  manejarEnviarMensaje,
  setMensaje,
  mensaje,
  errorInteraccion,
  indexar,
  conectarPub,
  mostrarNotificacion,
  setConectarPub,
  hacerPublicacion,
  cargandoConexion,
  setPerfilesAbiertos,
  setMencionarPerfiles,
  lensConectado,
  setCaretCoord,
  elementoTexto,
  descripcion,
  setDescripcion,
  caretCoord,
  perfilesAbiertos,
  mencionarPerfiles,
  setComentarPublicar,
  comentarPublicar,
  manejarGif,
  buscarGifs,
  setBuscarGifs,
  gifCargando,
  hacerCita,
  citaPublicar,
  setCitaPublicar,
  setCitaAbierta,
  citaAbierta,
  citaCargando,
  setCaretCoordCita,
  mencionarPerfilesCita,
  manejarArchivoCita,
  setMencionarPerfilesCita,
  setPerfilesAbiertosCita,
  perfilesAbiertosCita,
  caretCoordCita,
  elementoTextoCita,
  aprobado,
  aprobar,
  cargandoColeccion,
  manejarColeccionar,
  mostrarInteracciones,
  setMostrarInteracciones,
  setCarrito,
  setAbrirCita,
  setIndexar,
  publicClient,
  address,
  manejarLens,
  escena,
  conectado,
  openConnectModal,
}): JSX.Element => {
  return (
    <>
      {mostrarInteracciones?.abierto && (
        <Interacciones
          dict={dict}
          setCarrito={setCarrito}
          setAbrirCita={setAbrirCita}
          publicClient={publicClient}
          address={address!}
          manejarLens={manejarLens}
          escena={escena}
          conectado={conectado}
          openConnectModal={openConnectModal}
          setIndexar={setIndexar}
          setComentarPublicar={setComentarPublicar}
          setErrorInteraccion={setErrorInteraccion}
          setMostrarNotificacion={setMostrarNotificacion}
          setOpcionAbierta={setOpcionAbierta}
          setSeguirColeccionar={setSeguirColeccionar}
          setVerImagen={setVerImagen}
          comentarPublicar={comentarPublicar}
          mostrarInteracciones={mostrarInteracciones}
          setMostrarInteracciones={setMostrarInteracciones}
          lensConectado={lensConectado}
        />
      )}
      {mostrarNotificacion !== NotificacionType.Inactivo && (
        <Notificacion
          dict={dict}
          tipo={mostrarNotificacion!}
          setMostrarNotificacion={setMostrarNotificacion!}
          mensajeCargando={mensajeCargando}
          manejarEnviarMensaje={manejarEnviarMensaje}
          setMensaje={setMensaje}
          mensaje={mensaje}
        />
      )}
      {conectarPub && (
        <PublicacionConectada
          coleccionActual={coleccionActual}
          hacerPublicacion={hacerPublicacion}
          setConectarPub={setConectarPub}
          cargandoConexion={cargandoConexion}
          dict={dict}
          setPerfilesAbiertos={setPerfilesAbiertos}
          setMencionarPerfiles={setMencionarPerfiles}
          lensConectado={lensConectado}
          setCaretCoord={setCaretCoord}
          elementoTexto={elementoTexto}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          caretCoord={caretCoord}
          perfilesAbiertos={perfilesAbiertos}
          mencionarPerfiles={mencionarPerfiles}
        />
      )}
      {verImagen?.abierto && (
        <VerMedios setVerImagen={setVerImagen!} verImagen={verImagen!} />
      )}

      {citaAbierta && (
        <CitaPub
          dict={dict}
          setCitaAbierta={setCitaAbierta}
          hacerCita={hacerCita}
          citaPublicar={citaPublicar?.[0]}
          setCitaPublicar={setCitaPublicar}
          citaCargando={citaCargando}
          citaAbierta={citaAbierta}
          setOpcionAbierta={setOpcionAbierta}
          setCaretCoord={setCaretCoordCita}
          mencionarPerfiles={mencionarPerfilesCita}
          manejarArchivo={manejarArchivoCita}
          setMencionarPerfiles={setMencionarPerfilesCita}
          setPerfilesAbiertos={setPerfilesAbiertosCita}
          perfilesAbiertos={perfilesAbiertosCita}
          caretCoord={caretCoordCita}
          elementoTexto={elementoTextoCita}
          lensConectado={lensConectado}
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
            citaAbierta ? setCitaPublicar : setComentarPublicar
          }
          comentarPublicar={
            citaAbierta
              ? citaPublicar?.[0]
              : comentarPublicar?.[opcionAbierta?.indice]
          }
          manejarGif={manejarGif}
          gifCargando={gifCargando}
          setBuscarGifs={setBuscarGifs}
          buscarGifs={buscarGifs}
        />
      )}
      {seguirColeccionar && (
        <Seguir
          dict={dict}
          aprobado={aprobado}
          aprobar={aprobar}
          manejarColeccionar={manejarColeccionar}
          cargandoColeccion={cargandoColeccion}
          seguirColeccionar={seguirColeccionar}
          setSeguirColeccionar={setSeguirColeccionar}
        />
      )}
      {indexar !== Indexar.Inactivo && <Index dict={dict} tipo={indexar!} />}
      {errorInteraccion && (
        <Error dict={dict} setErrorInteraccion={setErrorInteraccion!} />
      )}
    </>
  );
};

export default Modals;
