import { INFURA_GATEWAY } from "@/app/lib/constants";
import Image from "next/legacy/image";
import { FunctionComponent, JSX, useContext } from "react";
import useGifs from "../hooks/useGifs";
import { AiOutlineLoading } from "react-icons/ai";
import { ModalContext } from "@/app/providers";

export const Gifs: FunctionComponent<{ dict: any }> = ({
  dict,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const { buscarGifs, setBuscarGifs, gifCargando, manejarGif } = useGifs();
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        contexto?.setGifs({
          open: false,
          index: 0,
        });
      }}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-oscuro border border-white cursor-default rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative relative w-[100vw] max-w-[64rem] h-[calc(100vw*(40/64))] max-h-[40rem] flex items-center justify-center">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmUsrPxWX5wcnmVGt5WykDgTNDM3KHsjSrMZSxZui5u4rC`}
            draggable={false}
            layout="fill"
            objectFit="cover"
          />
          <div
            className={`flex flex-col items-center py-10 px-4 gap-5 text-white font-bit relative w-[75%] h-[65%] justify-start flex overflow-y-scroll sm:text-base text-xs`}
          >
            <div
              className={`relative rounded-md flex flex-col gap-5 w-5/6 p-2 items-start justify-start max-h-fit`}
            >
              <div className="relative w-full h-fit flex flex-row items-start font-aust text-white justify-between text-xs rounded-md gap-2">
                <input
                  className="relative w-full h-10 py-px px-1 border border-white rounded-md bg-black"
                  placeholder={dict.Home.buscarGif}
                  onChange={(e) =>
                    setBuscarGifs((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    e.key === "Enter" &&
                      buscarGifs?.search?.trim() !== "" &&
                      !gifCargando &&
                      manejarGif(buscarGifs?.search);
                  }}
                />
                <div
                  className={`w-16 px-2 py-1 border rounded-md text-xs border-white h-10 border bg-black flex items-center justify-center ${
                    !gifCargando && "cursor-pointer active:scale-95"
                  }`}
                  onClick={() =>
                    buscarGifs?.search?.trim() !== "" &&
                    manejarGif(buscarGifs?.search)
                  }
                >
                  <div
                    className={`${
                      gifCargando && "animate-spin"
                    } relative w-fit h-fit flex items-center justify-center`}
                  >
                    {gifCargando ? (
                      <AiOutlineLoading size={10} color="white" />
                    ) : (
                      dict.Home.buscar
                    )}
                  </div>
                </div>
              </div>
              <div className="relative flex items-start justify-center overflow-y-scroll w-full h-fit">
                <div className="flex flex-wrap items-start justify-center gap-3 w-fit h-fit">
                  {buscarGifs.gifs?.map((gif: any, indiceDos: number) => {
                    return (
                      <div
                        key={indiceDos}
                        onClick={() => {
                          contexto?.setComentarPublicar((prev) => {
                            const arr = [...prev];

                            if (
                              Number(
                                contexto?.comentarPublicar[
                                  contexto?.gifs?.index
                                ]?.imagenes?.length
                              ) +
                                Number(
                                  contexto?.comentarPublicar[
                                    contexto?.gifs?.index
                                  ]?.videos?.length
                                ) +
                                Number(
                                  contexto?.comentarPublicar[
                                    contexto?.gifs?.index
                                  ]?.gifs?.length
                                ) ==
                              4
                            ) {
                              let medios = [
                                ...(contexto?.comentarPublicar?.[
                                  contexto?.gifs?.index
                                ]?.imagenes || []),
                                ...(
                                  contexto?.comentarPublicar?.[
                                    contexto?.gifs?.index
                                  ]?.gifs || []
                                )?.map((item) => ({
                                  medios: item,
                                  tipo: "gif",
                                })),
                                ...(
                                  contexto?.comentarPublicar?.[
                                    contexto?.gifs?.index
                                  ]?.videos || []
                                )?.map((item) => ({
                                  medios: item,
                                  tipo: "video",
                                })),
                              ];

                              medios.pop();

                              medios.push({
                                tipo: "gif",
                                medios: gif?.media_formats?.gif?.url,
                              });

                              arr[contexto?.gifs?.index] = {
                                ...arr[contexto?.gifs?.index],
                                imagenes: medios?.filter(
                                  (item) => item.tipo == "image"
                                ),
                                videos: medios
                                  ?.filter((item) => item.tipo == "video")
                                  ?.map((item) => item.medios),
                                gifs: medios
                                  ?.filter((item) => item.tipo == "gif")
                                  ?.map((item) => item.medios),
                              };
                            } else {
                              let gifs = [
                                ...(contexto?.comentarPublicar?.[
                                  contexto?.gifs?.index
                                ]?.gifs || []),
                              ];

                              gifs.push(gif?.media_formats?.gif?.url as string);

                              arr[contexto?.gifs?.index] = {
                                ...arr[contexto?.gifs?.index],
                                gifs,
                              };
                            }

                            return arr;
                          });
                          contexto?.setGifs({
                            open: false,
                            index: contexto?.gifs?.index,
                          });
                        }}
                        className="relative w-20 h-20 rounded-md flex items-center justify-center cursor-pointer hover:opacity-70 bg-white"
                      >
                        <Image
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                          src={gif?.media_formats?.gif?.url}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gifs;
