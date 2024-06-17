import { FunctionComponent } from "react";
import { PublicacionConectadaProps } from "../types/common.types";
import manejarBuscarPerfiles from "@/lib/helpers/manejarBuscarPerfiles";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { AiOutlineLoading } from "react-icons/ai";
import { Profile } from "../../../../graphql/generated";
import createProfilePicture from "@/lib/helpers/createProfilePicture";

const PublicacionConectada: FunctionComponent<PublicacionConectadaProps> = ({
  setConectarPub,
  hacerPublicacion,
  coleccionActual,
  cargandoConexion,
  setPerfilesAbiertos,
  setMencionarPerfiles,
  lensConectado,
  setCaretCoord,
  elementoTexto,
  dict,
  descripcion,
  setDescripcion,
  caretCoord,
  perfilesAbiertos,
  mencionarPerfiles,
}): JSX.Element => {
  return (
    <div
      className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setConectarPub(false)}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-black border border-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] sm:w-[45vw] xl:w-[40vw] h-fit max-h-[90vh] min-h-[40vh] xl:min-h-[60vh] flex flex-col gap-4 items-center justify-center p-4">
          <div className="relative w-full h-fit flex items-center justify-center">
            <div className="relative w-60 h-60 flex items-center justify-center border border-white">
              <Image
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/${
                  coleccionActual.imagen?.split("ipfs://")?.[1]
                }`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div
            className={`relative w-full  h-full bg-black/80 flex flex-col items-center text-white font-vcr justify-start`}
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
                  lensConectado,
                  setCaretCoord,
                  elementoTexto
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
                {mencionarPerfiles?.map((user: Profile, indexTwo: number) => {
                  const profileImage = createProfilePicture(
                    user?.metadata?.picture
                  );
                  return (
                    <div
                      key={indexTwo}
                      className={`relative border-y border-white w-full h-10 px-3 py-2 bg-black flex flex-row gap-3 cursor-pointer items-center justify-center`}
                      onClick={() => {
                        setPerfilesAbiertos((prev) => {
                          const arr = [...prev];
                          arr[0] = false;
                          return arr;
                        });

                        setDescripcion(
                          (prev) =>
                            prev?.substring(0, prev?.lastIndexOf("@")) +
                            `${user?.handle?.suggestedFormatted?.localName}`
                        );
                      }}
                    >
                      <div className="relative flex flex-row w-full h-full text-white font-aust items-center justify-center gap-2">
                        <div
                          className={`relative rounded-full flex bg-black w-3 h-3 items-center justify-center`}
                          id="pfp"
                        >
                          {profileImage && (
                            <Image
                              src={profileImage}
                              objectFit="cover"
                              alt="pfp"
                              layout="fill"
                              className="relative w-fit h-fit rounded-full items-center justify-center flex"
                              draggable={false}
                            />
                          )}
                        </div>
                        <div className="relative items-center justify-center w-fit h-fit text-xs flex">
                          {user?.handle?.suggestedFormatted?.localName}
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
