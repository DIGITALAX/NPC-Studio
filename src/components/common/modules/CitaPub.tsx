import { FunctionComponent } from "react";
import { CitaPubProps } from "../types/common.types";
import manejarBuscarPerfiles from "@/lib/helpers/manejarBuscarPerfiles";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { AiOutlineLoading } from "react-icons/ai";
import { Profile, Quote } from "../../../../graphql/generated";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import Cita from "./Cita";
import Comentario from "./Comentario";

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
}): JSX.Element => {
  return (
    <div
      className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setCitaAbierta(undefined)}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-offNegro rounded-md border border-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] sm:w-[45vw] xl:w-[40vw] h-fit max-h-[90vh] min-h-[40vh] xl:min-h-[60vh] flex flex-col gap-4 items-center justify-center p-4">
          <Cita cita={citaAbierta as Quote} />
          <Comentario
            setOpcionAbierta={setOpcionAbierta}
            manejarArchivo={manejarArchivo}
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
