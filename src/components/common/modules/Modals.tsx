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

const Modals: FunctionComponent<ModalsProps> = ({
  dict,
  setErrorInteraccion,
  setVerImagen,
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
}): JSX.Element => {
  return (
    <>
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
      {indexar !== Indexar.Inactivo && <Index dict={dict} tipo={indexar!} />}
      {errorInteraccion && (
        <Error dict={dict} setErrorInteraccion={setErrorInteraccion!} />
      )}
    </>
  );
};

export default Modals;
