import { FunctionComponent } from "react";
import { CitaPubProps } from "../types/common.types";
import Cita from "./Cita";
import Comentario from "./Comentario";
import { Quote } from "../../../../graphql/generated";

const CitaPub: FunctionComponent<CitaPubProps> = ({
  dict,
  hacerCita,
  citaPublicar,
  setCitaPublicar,
  setCitaAbierta,
  citaAbierta,
  citaCargando,
  elementoTexto,
  lensConectado,
  setOpcionAbierta,
  manejarArchivo,
  caretCoord,
  setCaretCoord,
  setPerfilesAbiertos,
  setMencionarPerfiles,
  mencionarPerfiles,
  perfilesAbiertos,
  setMostrarPerfil
}): JSX.Element => {
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setCitaAbierta(undefined)}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-offNegro rounded-md border border-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] sm:w-[45vw] xl:w-[40vw] h-full max-h-[90vh] min-h-[40vh] xl:min-h-[60vh] flex flex-col gap-4 items-center justify-between p-4 overflow-y-scroll">
          <Cita
            setMostrarPerfil={setMostrarPerfil}
            cita={citaAbierta as Quote}
          />
          <Comentario
            setOpcionAbierta={setOpcionAbierta}
            manejarArchivo={manejarArchivo}
            setMostrarPerfil={setMostrarPerfil}
            caretCoord={caretCoord}
            setCaretCoord={setCaretCoord}
            setPerfilesAbiertos={setPerfilesAbiertos}
            setMencionarPerfiles={setMencionarPerfiles}
            indice={0}
            elementoTexto={elementoTexto}
            lensConectado={lensConectado}
            publicacionCargando={citaCargando}
            manejarPublicar={hacerCita}
            dict={dict}
            cita
            comentarioId={citaAbierta?.id}
            mencionarPerfiles={mencionarPerfiles}
            perfilesAbiertos={perfilesAbiertos}
            comentarPublicar={[citaPublicar]}
            setComentarPublicar={setCitaPublicar}
          />
        </div>
      </div>
    </div>
  );
};

export default CitaPub;
