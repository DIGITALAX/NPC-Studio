import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../lib/constants";
import Draggable from "react-draggable";
import { FunctionComponent } from "react";
import { DialogProps } from "../types/game.types";
import Chat from "./Chat";
import { IoIosCloseCircle } from "react-icons/io";

const Dialog: FunctionComponent<DialogProps> = ({
  setDragDialog,
  setIndiceConversacionActual,
  wrapperRef,
  setComentarPublicar,
  comentarPublicar,
  lensConectado,
  dict,
  address,
  publicClient,
  setIndexar,
  setErrorInteraccion,
  escena,
  setOpcionAbierta,
  setAbrirCita,
  setSeguirColeccionar,
  setVerImagen,
  npcIds,
  setCarrito,
  setMostrarNotificacion,
}) => {
  return (
    <Draggable ref={wrapperRef} cancel=".close" enableUserSelectHack={false}>
      <div className="absolute w-full sm:w-96 z-200 h-fit flex flex-col items-start justify-start p-2 rounded-md border-4 border-white bg-black/80 cursor-grab active:cursor-grabbing gap-6">
        <div className="relative w-full h-fit flex items-start justify-start flex-col gap-3">
          <div className="close" onClick={() => setDragDialog(false)}>
            <IoIosCloseCircle size={20} color="white" />
          </div>
          <Chat
            open
            setCarrito={setCarrito}
            setMostrarNotificacion={setMostrarNotificacion}
            npcIds={npcIds}
            setSeguirColeccionar={setSeguirColeccionar}
            setAbrirCita={setAbrirCita}
            dict={dict}
            comentarPublicar={comentarPublicar}
            setComentarPublicar={setComentarPublicar}
            setOpcionAbierta={setOpcionAbierta}
            setVerImagen={setVerImagen}
            lensConectado={lensConectado}
            address={address}
            publicClient={publicClient}
            setIndexar={setIndexar}
            setErrorInteraccion={setErrorInteraccion}
            escena={escena}
          />
        </div>
        <div className="relative w-full h-fit flex items-end justify-end">
          <div className="relative flex items-center justify-center flex-row gap-2">
            {[
              {
                imagen: "QmdXGstnuEL9SoxdPoP6VwavmLCD1AauGkAs4fp4PsEgJu",
                funcion: () => {
                  setIndiceConversacionActual((prev) =>
                    prev - 1 >= 0 ? prev - 1 : 7
                  );
                },
              },
              {
                imagen: "QmdADQtTM5VkpA7eAS5ozQ8k6Qg3QTGmf5LTwbzvLRtwgs",
                funcion: () => {
                  setIndiceConversacionActual((prev) =>
                    prev + 1 < 8 ? prev + 1 : 0
                  );
                },
              },
            ].map(
              (
                image: {
                  imagen: string;
                  funcion: () => void;
                },
                index: number
              ) => {
                return (
                  <div
                    key={index}
                    className="relative w-5 h-5 flex items-center justify-center cursor-pointer active:scale-95"
                    onClick={() => image.funcion()}
                  >
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/${image.imagen}`}
                      draggable={false}
                      layout="fill"
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Dialog;
