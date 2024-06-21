import { AiOutlineLoading } from "react-icons/ai";
import { Notificacion, NotificacionCambioProps } from "../types/common.types";

function NotificacionCambio({
  tipo,
  dict,
  mensajeCargando,
  manejarEnviarMensaje,
  setMensaje,
  mensaje,
}: NotificacionCambioProps) {
  switch (tipo) {
    case Notificacion.Comprado:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-lg text-center">
          {dict.Home.comprado}
        </div>
      );
    case Notificacion.Añadido:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-lg text-center">
          {dict.Home.añadido}
        </div>
      );
    case Notificacion.ColeccionEliminada:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-lg text-center">
          {dict.Home.coleccionEliminada}
        </div>
      );
    case Notificacion.Creado:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-lg text-center">
          {dict.Home.creado}
        </div>
      );
    case Notificacion.GaleriaEliminada:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-lg text-center">
          {dict.Home.galeriaEliminada}
        </div>
      );
      
    default:
      return (
        <>
          <div className="relative w-3/4 h-fit flex items-center justify-center text-lg text-center">
            {dict.Home.notif}
          </div>
          <textarea
            className={`relative w-3/4 h-full flex items-center justify-center bg-black p-2 text-sm border border-white rounded-md ${
              mensaje === dict.Home.sent ? "text-white" : "text-gray-500"
            }`}
            style={{ resize: "none" }}
            onChange={(e) => setMensaje(e.target.value)}
            value={mensaje}
          ></textarea>
          <div
            className={`absolute bottom-2 right-2 flex items-center justify-center bg-offNegro w-16 text-xs rounded-md border border-ligero text-ligero h-8 ${
              !mensajeCargando && "cursor-pointer active:scale-95"
            }`}
            onClick={() => !mensajeCargando && manejarEnviarMensaje()}
          >
            <div
              className={`relative w-fit h-fit flex items-center justify-center ${
                mensajeCargando ? "animate-spin" : "top-px"
              }`}
            >
              {mensajeCargando ? (
                <AiOutlineLoading color="#46B171" size={10} />
              ) : (
                dict.Home.send
              )}
            </div>
          </div>
        </>
      );
  }
}

export default NotificacionCambio;
