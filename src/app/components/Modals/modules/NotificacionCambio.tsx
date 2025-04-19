import { Notificacion, NotificacionCambioProps } from "../types/modals.types";

function NotificacionCambio({ tipo, dict }: NotificacionCambioProps) {
  switch (tipo) {
    case Notificacion.Comprado:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-xs sm:text-lg text-center">
          {dict.Home.comprado}
        </div>
      );
    case Notificacion.Añadido:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-xs sm:text-lg text-center">
          {dict.Home.añadido}
        </div>
      );
    case Notificacion.ColeccionEliminada:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-xs sm:text-lg text-center">
          {dict.Home.coleccionEliminada}
        </div>
      );
    case Notificacion.Agotado:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-xs sm:text-lg text-center">
          {dict.Home.ago}
        </div>
      );
    case Notificacion.Creado:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-xs sm:text-lg text-center">
          {dict.Home.creado}
        </div>
      );
    case Notificacion.Campos:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-xs sm:text-lg text-center">
          {dict.Home.campos}
        </div>
      );
    case Notificacion.GaleriaEliminada:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-xs sm:text-lg text-center">
          {dict.Home.galeriaEliminada}
        </div>
      );
    case Notificacion.Cumplimiento:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-xs sm:text-lg text-center">
          {dict.Home.cumplimiento}
        </div>
      );
    case Notificacion.Diseñador:
      return (
        <div className="relative w-3/4 h-fit flex items-center justify-center text-xs sm:text-lg text-center">
          {dict.Home.designer}
        </div>
      );
  }
}

export default NotificacionCambio;
