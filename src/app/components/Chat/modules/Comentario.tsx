import { ChangeEvent, FunctionComponent, JSX, useContext } from "react";
import Image from "next/legacy/image";
import { AiOutlineLoading } from "react-icons/ai";
import MediosCambio from "./MediosCambio";
import { ImCross } from "react-icons/im";
import { ModalContext } from "@/app/providers";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import useMencionar from "../hooks/useMencionar";
import manejarBuscarPerfiles from "@/app/lib/helpers/manejarBuscarPerfiles";
import { Account } from "@lens-protocol/client";
import { ComentarioProps } from "../types/chat.types";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";
import { useAccount } from "wagmi";

const Comentario: FunctionComponent<ComentarioProps> = ({
  dict,
  cita,
  indice,
  comentarioId,
  llamarFeed,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const { address } = useAccount();
  const {
    setCaretCoord,
    caretCoord,
    perfilesAbiertos,
    setPerfilesAbiertos,
    setMencionarPerfiles,
    mencionarPerfiles,
    elementoTexto,
    publicacionCargando,
    manejarPublicar,
    manejarArchivo,
  } = useMencionar(dict, address, llamarFeed);
  return (
    <div className="relative w-full text-white font-aust flex flex-col gap-6 items-center justify-center text-left rounded-md h-fit bottom-0">
      <div className="relative w-full h-fit flex items-start justify-start">
        <textarea
          className={`bg-black relative w-full text-sm p-1 flex rounded-md border-lime border-2 ${
            cita ? "h-[9rem]" : "h-[6rem]"
          }`}
          placeholder={dict.Home.muestraCom}
          style={{ resize: "none" }}
          value={contexto?.comentarPublicar[indice]?.contenido}
          onChange={(e) => {
            e.stopPropagation();

            contexto?.setComentarPublicar((prev) => {
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
              contexto?.lensConectado,
              contexto?.clienteLens!,
              setCaretCoord,
              elementoTexto
            );
          }}
          ref={elementoTexto as any}
          disabled={publicacionCargando}
        ></textarea>
        <div className="absolute w-full h-fit flex justify-between items-center flex-row gap-3 bottom-2 left-0 px-2">
          <div className="relative w-fit h-fit items-center justify-start flex flex-row gap-2">
            {[
              {
                imagen: "QmcFSGjWxGPMfmdEWfAoEA4FdSyK8ksZ84utzonsJytpe7",
                titulo: dict.Home.imagen,
                funcion: (e: ChangeEvent<HTMLInputElement>) =>
                  manejarArchivo(e, "imagen", indice),
                apagado:
                  Number(contexto?.comentarPublicar[indice]?.imagenes?.length) +
                    Number(contexto?.comentarPublicar[indice]?.videos?.length) +
                    Number(contexto?.comentarPublicar[indice]?.gifs?.length) ==
                  4,
              },
              {
                imagen: "QmdqNyPSGvKJUnXuN8xSVXrG8EsGVBhuWRtyxeiNCfoZnr",
                titulo: dict.Home.video,
                funcion: (e: ChangeEvent<HTMLInputElement>) =>
                  manejarArchivo(e, "video", indice),
                apagado:
                  Number(contexto?.comentarPublicar[indice]?.imagenes?.length) +
                    Number(contexto?.comentarPublicar[indice]?.videos?.length) +
                    Number(contexto?.comentarPublicar[indice]?.gifs?.length) ==
                  4,
              },
              {
                imagen: "Qmbiz3ZxqxebgHot8MPWzcpBsMTYCwn1GyBC59X7YX9GkY",
                titulo: "Gifs",
                apagado:
                  Number(contexto?.comentarPublicar[indice]?.imagenes?.length) +
                    Number(contexto?.comentarPublicar[indice]?.videos?.length) +
                    Number(contexto?.comentarPublicar[indice]?.gifs?.length) ==
                  4,
                funcion: () =>
                  contexto?.setGifs({
                    open: true,
                    index: indice,
                  }),
              },
              {
                imagen: "QmccAVayLp58uh5Uc5ZVm2TVhsP3TSFMsGsrmEXQfrGRZB",
                titulo: dict.Home.collect,
                funcion: () =>
                  contexto?.setCollectOptions({
                    open: true,
                    index: indice,
                  }),
              },
            ].map(
              (
                elemento: {
                  imagen: string;
                  titulo: string;
                  funcion: (e?: any) => void;
                  apagado?: boolean;
                },
                indiceDos: number
              ) => {
                return indiceDos !== 2 && indiceDos !== 3 ? (
                  <label
                    key={indiceDos}
                    className={`relative flex items-center justify-center  w-5 h-5 rounded-sm ${
                      elemento?.apagado
                        ? "opacity-40"
                        : "cursor-pointer active:scale-95"
                    }`}
                    title={elemento.titulo}
                  >
                    <Image
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${elemento.imagen}`}
                      draggable={false}
                      className="rounded-sm"
                    />
                    <input
                      hidden
                      type="file"
                      accept={
                        indiceDos === 0 ? "image/png, image/gif" : "video/mp4"
                      }
                      multiple={true}
                      onChange={(e) =>
                        e?.target?.files?.[0] &&
                        !elemento.apagado &&
                        elemento.funcion(e)
                      }
                    />
                  </label>
                ) : (
                  <div
                    key={indiceDos}
                    className={`relative flex items-center justify-center cursor-pointer active:scale-95 w-5 h-5 rounded-sm ${
                      elemento?.apagado
                        ? "opacity-40"
                        : "cursor-pointer active:scale-95"
                    }`}
                    title={elemento.titulo}
                    onClick={() => !elemento.apagado && elemento.funcion()}
                  >
                    <Image
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${elemento.imagen}`}
                      draggable={false}
                      className="rounded-sm"
                    />
                  </div>
                );
              }
            )}
          </div>
          <div className="relative w-fit h-fit flex items-center justify-end flex">
            <div
              className={`relative font-vcr flex items-center justify-center border border-white rounded-md w-14 text-xxs h-7 ${
                !publicacionCargando && "cursor-pointer active:scale-95"
              }`}
              onClick={() =>
                !publicacionCargando &&
                manejarPublicar(indice, comentarioId, cita)
              }
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
          </div>
        </div>
        {mencionarPerfiles?.length > 0 && perfilesAbiertos?.[indice] && (
          <div
            className={`absolute w-40 border border-white max-h-40 h-fit flex flex-col overflow-y-auto items-start justify-start z-100`}
            style={{
              top: caretCoord[indice].y + 30,
              left: caretCoord[indice].x,
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
                      arr[indice] = false;
                      return arr;
                    });

                    contexto?.setComentarPublicar((prev) => {
                      const arr = [...prev];
                      arr[indice] = {
                        ...arr[indice],
                        contenido:
                          arr[indice]?.contenido?.substring(
                            0,
                            arr[indice]?.contenido?.lastIndexOf("@")
                          ) + `${user?.username?.localName}`,
                      };
                      return arr;
                    });
                  }}
                >
                  <div
                    className="relative flex flex-row w-full h-full text-white font-aust items-center justify-center gap-2  cursor-pointer active:scale-95"
                    onClick={() => contexto?.setMostrarPerfil(user?.address)}
                  >
                    <div
                      className={`relative rounded-full flex bg-black w-3 h-3 items-center justify-center`}
                    >
                      {user?.metadata?.picture && (
                        <Image
                          src={handleProfilePicture(user?.metadata?.picture)}
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
      {(Number(contexto?.comentarPublicar?.[indice]?.videos?.length) > 0 ||
        Number(contexto?.comentarPublicar?.[indice]?.gifs?.length) > 0 ||
        Number(contexto?.comentarPublicar?.[indice]?.imagenes?.length) > 0) && (
        <div className="relative gap-2 w-full h-fit items-center justify-start flex flex-row">
          {[
            ...(contexto?.comentarPublicar?.[indice]?.videos || [])?.map(
              (video) => ({
                type: "video",
                item: video,
              })
            ),
            ...(contexto?.comentarPublicar?.[indice]?.imagenes || [])?.map(
              (image) => ({
                type: "image",
                item: image?.medios,
              })
            ),
            ...(contexto?.comentarPublicar?.[indice]?.gifs || []).map(
              (gif) => ({
                type: "gif",
                item: gif,
              })
            ),
          ].map(
            (
              media: {
                type: string;
                item: string;
              },
              indiceDos: number
            ) => {
              return (
                <div
                  key={indiceDos}
                  className="relative w-10 h-10 rounded-md flex items-center justify-center border border-white"
                >
                  <MediosCambio
                    tipo={media.type !== "video" ? "image" : "video"}
                    fuenteUrl={media?.item}
                    classNameVideo={{
                      objectFit: "cover",
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyItems: "center",
                      borderRadius: "0.375rem",
                      position: "relative",
                    }}
                    classNameImagen={"rounded-md object-cover flex"}
                  />
                  <div
                    className="absolute w-4 h-4 bg-black p-px -right-1 -top-1 bg-black rounded-full cursor-pointer flex items-center justify-center border border-white"
                    onClick={() =>
                      !publicacionCargando &&
                      contexto?.setComentarPublicar((prev) => {
                        const arr = [...prev];
                        arr[indice] = {
                          ...arr[indice],
                          imagenes:
                            media.type === "image"
                              ? (arr[indice]?.imagenes ?? []).filter(
                                  (med) => med.medios !== media.item
                                )
                              : arr[indice]?.imagenes,
                          videos:
                            media.type === "video"
                              ? (arr[indice]?.videos ?? []).filter(
                                  (med) => med !== media.item
                                )
                              : arr[indice]?.videos,
                          gifs:
                            media.type === "gif"
                              ? (arr[indice]?.gifs ?? []).filter(
                                  (med) => med !== media.item
                                )
                              : arr[indice]?.gifs,
                        };
                        return arr;
                      })
                    }
                  >
                    <ImCross color={"white"} size={7} />
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Comentario;
