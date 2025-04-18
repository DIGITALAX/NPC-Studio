import { FunctionComponent, JSX, useContext } from "react";
import Comentario from "../../Chat/modules/Comentario";
import { ModalContext } from "@/app/providers";
import Cita from "../../Chat/modules/Cita";

const MakeCita: FunctionComponent<{ dict: any }> = ({ dict }): JSX.Element => {
  const contexto = useContext(ModalContext);
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        contexto?.setCitaAbierta({
          open: false,
        });
      }}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-offNegro rounded-md border border-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] sm:w-[45vw] xl:w-[40vw] h-full max-h-[90vh] min-h-[40vh] xl:min-h-[60vh] flex flex-col gap-4 items-center justify-between p-4 overflow-y-scroll">
          <Cita
            cita={contexto?.citaAbierta?.post!}
            setMostrarPerfil={contexto?.setMostrarPerfil!}
          />
          <Comentario
            dict={dict}
            cita
            indice={1}
            comentarioId={contexto?.citaAbierta?.post?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default MakeCita;
