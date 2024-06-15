import { FunctionComponent, useRef } from "react";
import Image from "next/legacy/image";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import manejarBuscarPerfiles from "@/lib/helpers/manejarBuscarPerfiles";
import { AiOutlineLoading } from "react-icons/ai";
import { Profile } from "../../../../graphql/generated";
import { ComentarioProps } from "../types/common.types";

const Comentario: FunctionComponent<ComentarioProps> = ({
  caretCoord,
  setCaretCoord,
  setPerfilesAbiertos,
  setMencionarPerfiles,
  indice,
  lensConectado,
  publicacionCargando,
  manejarPublicar,
  dict,
  mencionarPerfiles,
  perfilesAbiertos,
  comentarPublicar,
  setComentarPublicar,
  comentarioId,
  elementoTexto
}): JSX.Element => {
  return (
    <div className="relative w-full text-white font-aust bg-black/80 border-lime border-2 flex items-center justify-center text-left rounded-md h-36 bottom-0">
      <textarea
        className="bg-black/80 relative w-full text-sm h-full p-1 flex rounded-md"
        style={{ resize: "none" }}
        value={comentarPublicar[0]?.contenido}
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
        ref={elementoTexto as any}
        disabled={publicacionCargando}
      ></textarea>
      <div
        className={`absolute font-vcr bottom-2 right-2 flex items-center justify-center border border-white rounded-md w-14 text-xxs h-7 ${
          !publicacionCargando && "cursor-pointer active:scale-95"
        }`}
        onClick={() => manejarPublicar(indice, comentarioId)}
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
            top: caretCoord[0].y + 30,
            left: caretCoord[0].x,
          }}
        >
          {mencionarPerfiles?.map((user: Profile, indexTwo: number) => {
            const profileImage = createProfilePicture(user?.metadata?.picture);
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
                        comentarPublicar[0]?.contenido?.substring(
                          0,
                          comentarPublicar[0]?.contenido?.lastIndexOf("@")
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
  );
};

export default Comentario;
