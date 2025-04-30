import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constants";
import manejarBuscarPerfiles from "@/app/lib/helpers/manejarBuscarPerfiles";
import { ModalContext } from "@/app/providers";
import { Account } from "@lens-protocol/client";
import Image from "next/legacy/image";
import { FunctionComponent, JSX, RefObject, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import useConnectPub from "../hooks/useConnectPub";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const PublicacionConectada: FunctionComponent<{ dict: any }> = ({
  dict,
}): JSX.Element => {
  const {
    cargandoConexion,
    hacerPublicacion,
    caretCoord,
    setCaretCoord,
    perfilesAbiertos,
    setPerfilesAbiertos,
    mencionarPerfiles,
    setMencionarPerfiles,
    elementoTexto,
    descripcion,
    setDescripcion,
  } = useConnectPub(dict);
  const contexto = useContext(ModalContext);
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        contexto?.setConectarPub(false);
      }}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-oscuro rounded-md border border-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] sm:w-[45vw] xl:w-[40vw] h-fit max-h-[90vh] min-h-[40vh] xl:min-h-[60vh] flex flex-col gap-4 items-center justify-center p-4">
          <div className="relative w-full h-fit flex items-center justify-center">
            <div className="relative w-60 h-60 flex items-center justify-center border border-ligero rounded-md">
              <Image
                draggable={false}
                src={`${INFURA_GATEWAY_INTERNAL}${
                  contexto?.coleccionActual.imagenes?.[0]?.split("ipfs://")?.[1]
                }`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
          <div
            className={`relative w-full h-full bg-black/80 flex flex-col items-center text-white round-md font-vcr justify-start`}
          >
            <textarea
              value={descripcion || ""}
              onChange={(e) => {
                setDescripcion(e.target.value);
                manejarBuscarPerfiles(
                  e,
                  setPerfilesAbiertos,
                  setMencionarPerfiles,
                  0,
                  contexto?.lensConectado,
                  contexto?.clienteLens!,
                  setCaretCoord,
                  elementoTexto as RefObject<HTMLTextAreaElement | null>
                );
              }}
              ref={elementoTexto as any}
              className="relative rounded-sm p-1 bg-black text-xs border border-white w-full h-40 break-all"
              style={{
                resize: "none",
              }}
            ></textarea>
            <div
              className={`absolute font-vcr bottom-2 right-2 flex items-center justify-center border border-white rounded-md w-14 text-xxs h-7 ${
                !cargandoConexion && "cursor-pointer active:scale-95"
              }`}
              onClick={() => hacerPublicacion()}
            >
              {cargandoConexion ? (
                <div
                  className={`relative w-fit h-fit flex items-center justify-center ${
                    cargandoConexion && "animate-spin"
                  }`}
                >
                  <AiOutlineLoading size={15} color="white" />
                </div>
              ) : (
                dict.Home.send
              )}
            </div>
            {mencionarPerfiles?.length > 0 && perfilesAbiertos && (
              <div
                className={`absolute w-40 border border-white max-h-40 h-fit flex flex-col overflow-y-auto items-start justify-start z-100`}
                style={{
                  top: caretCoord[0].y + 30,
                  left: caretCoord[0].x,
                }}
              >
                {mencionarPerfiles?.map((user: Account, indexTwo: number) => {
                  return (
                    <div
                      key={indexTwo}
                      className={`relative border-y border-white w-full h-10 px-3 py-2 bg-black flex flex-row gap-3 cursor-pointer items-center justify-center break-all`}
                      onClick={() => {
                        setPerfilesAbiertos((prev) => {
                          const arr = [...prev];
                          arr[0] = false;
                          return arr;
                        });

                        setDescripcion(
                          (prev) =>
                            prev?.substring(0, prev?.lastIndexOf("@")) +
                            `${user?.username?.localName}`
                        );
                      }}
                    >
                      <div className="relative flex flex-row w-full h-full text-white font-aust items-center justify-center gap-2">
                        <div
                          className={`relative rounded-full flex bg-black w-3 h-3 items-center justify-center`}
                        >
                          {user?.metadata?.picture && (
                            <Image
                              src={handleProfilePicture(
                                user?.metadata?.picture
                              )}
                              objectFit="cover"
                              alt="pfp"
                              layout="fill"
                              className="relative w-fit h-fit rounded-full items-center justify-center flex"
                              draggable={false}
                            />
                          )}
                        </div>
                        <div className="relative items-center justify-center w-fit h-fit text-xs flex break-all">
                          {user?.username?.localName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicacionConectada;
