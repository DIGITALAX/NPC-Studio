import { FunctionComponent, useRef } from "react";
import { ChatProps } from "../types/game.types";
import Image from "next/legacy/image";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import { Profile } from "../../../../graphql/generated";
import manejarBuscarPerfiles from "@/lib/helpers/manejarBuscarPerfiles";
import { AiOutlineLoading } from "react-icons/ai";

const Chat: FunctionComponent<ChatProps> = ({
  contenedorMensajesRef,
  open,
  lensConectado,
  indice,
  setPerfilesAbiertos,
  setMencionarPerfiles,
  setCaretCoord,
  setComentarPublicar,
  perfilesAbiertos,
  caretCoord,
  comentarPublicar,
  mencionarPerfiles,
  dict,
  publicacionCargando,
  manejarPublicar
}): JSX.Element => {
  const elementoTexto = useRef<HTMLTextAreaElement | null>(null);
  return (
    <div
      className={`relative w-full flex flex-col items-start justify-start font-at text-base leading-4 max-w-full text-white break-all ${
        open ? "h-96 overflow-y-scroll" : "h-full"
      }`}
      ref={contenedorMensajesRef}
    >
      <div className="relative w-full h-full flex items-start justify-center"></div>
      <div className="relative w-full text-white font-aust bg-black/80 border-lime border-2 flex items-center justify-center text-left rounded-md h-40 bottom-0">
        <textarea
          className="bg-black/80 relative w-full text-sm h-full p-1 flex rounded-md"
          style={{ resize: "none" }}
          value={comentarPublicar?.contenido}
          onChange={(e) => {
            setComentarPublicar((prev) => {
              const arr = [...prev];
              arr[indice] = {
                ...arr[indice],
                contenido: e.target.value,
              };
              return arr;
            });
            manejarBuscarPerfiles(
              e,
              setPerfilesAbiertos,
              setMencionarPerfiles,
              indice,
              lensConectado,
              setCaretCoord,
              elementoTexto
            );
          }}
          ref={elementoTexto}
          disabled={publicacionCargando}
        ></textarea>
        <div
          className={`absolute font-vcr bottom-2 right-2 flex items-center justify-center border border-white rounded-md w-14 text-xxs h-7 ${
            !publicacionCargando && "cursor-pointer active:scale-95"
          }`}
          onClick={() => manejarPublicar()}
        >
          {publicacionCargando ? (
            <div
              className={`relative w-fit h-fit flex items-center justify-center ${
                publicacionCargando && "animate-spin"
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
              top: caretCoord.y + 30,
              left: caretCoord.x,
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
                      arr[indice] = false;
                      return arr;
                    });

                    setComentarPublicar((prev) => {
                      const arr = [...prev];
                      arr[indice] = {
                        ...arr[indice],
                        contenido:
                          comentarPublicar?.contenido?.substring(
                            0,
                            comentarPublicar?.contenido?.lastIndexOf("@")
                          ) + `${user?.handle?.suggestedFormatted?.localName}`,
                      };
                      return arr;
                    });
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
  );
};

export default Chat;
