"use client";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "@/lib/constants";
import { OpcionAbiertaProps } from "../types/common.types";
import { AiOutlineLoading } from "react-icons/ai";

function OpcionAbierta({
  setOpcionAbierta,
  opcionAbierta,
  dict,
  comentarPublicar,
  setComentarPublicar,
  setBuscarGifs,
  buscarGifs,
  manejarGif,
  gifCargando,
  monedasDisponibles,
  setDrops,
  drops,
}: OpcionAbiertaProps) {
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={() => setOpcionAbierta(undefined)}
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
            {opcionAbierta?.tipo === "gifs" ? (
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
                            setComentarPublicar((prev) => {
                              const arr = [...prev];

                              if (
                                Number(comentarPublicar?.imagenes?.length) +
                                  Number(comentarPublicar?.videos?.length) +
                                  Number(comentarPublicar?.gifs?.length) ==
                                4
                              ) {
                                let medios =
                                  [
                                    ...(comentarPublicar?.imagenes || []),
                                    ...(comentarPublicar?.videos || [])?.map(
                                      (i) => ({
                                        tipo: "video",
                                        medios: i,
                                      })
                                    ),
                                    ...(comentarPublicar?.gifs || [])?.map(
                                      (i) => ({
                                        tipo: "gif",
                                        medios: i,
                                      })
                                    ),
                                  ] || [];

                                medios.pop();

                                medios.push({
                                  tipo: "gif",
                                  medios: gif?.media_formats?.gif?.url,
                                });

                                arr[opcionAbierta.indice] = {
                                  ...arr[opcionAbierta.indice],
                                  gifs: medios
                                    .filter((m) => m.tipo == "gif")
                                    ?.map((i) => i.medios),
                                  imagenes: medios.filter(
                                    (m) =>
                                      m.tipo !== "video" && m.tipo !== "gif"
                                  ),
                                  videos: medios
                                    .filter((m) => m.tipo == "video")
                                    ?.map((i) => i.medios),
                                };
                              } else {
                                let gifs = [...(comentarPublicar?.gifs || [])];

                                gifs.push(
                                  gif?.media_formats?.gif?.url as string
                                );

                                arr[opcionAbierta.indice] = {
                                  ...arr[opcionAbierta.indice],
                                  gifs,
                                };
                              }

                              return arr;
                            });
                            setOpcionAbierta(undefined);
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
            ) : (
              <div
                className={`relative rounded-md flex flex-col gap-5 w-5/6 p-2 items-start justify-start max-h-fit`}
              >
                <div className="relative w-full h-full flex flex-col flex-wrap justify-start items-center gap-3 break-words p-3">
                  <div className="relative h-full w-full flex flex-wrap gap-4 items-start justify-center">
                    {[
                      {
                        type: "drop",
                        title: dict.Home.who,
                        dropValues: [dict.Home.todos, dict.Home.seguidor],
                        dropOpen: drops.whoCollectsOpen,
                        chosenValue: comentarPublicar?.coleccionar?.followerOnly
                          ? dict.Home.seguidor
                          : dict.Home.todos,
                        showObject: true,
                        openDropdown: () =>
                          setDrops((prev) => ({
                            ...prev,
                            whoCollectsOpen: !prev.whoCollectsOpen,
                          })),
                        setValue: (item: string) => {
                          setComentarPublicar((prev) => {
                            const arr = [...prev];
                            let col = arr[opcionAbierta?.indice!]?.coleccionar
                              ? arr[opcionAbierta?.indice!]?.coleccionar
                              : { followerOnly: false };

                            col =
                              drops?.award == "No"
                                ? {
                                    followerOnly:
                                      item === dict.Home.seguidor
                                        ? true
                                        : false,
                                  }
                                : {
                                    ...col,
                                    followerOnly:
                                      item === dict.Home.seguidor
                                        ? true
                                        : false,
                                  };

                            arr[opcionAbierta?.indice!] = {
                              ...arr[opcionAbierta?.indice!],
                              coleccionar: col,
                            };

                            return arr;
                          });

                          setDrops((prev) => ({
                            ...prev,
                            whoCollectsOpen: false,
                          }));
                        },
                      },
                      {
                        type: "drop",
                        title: dict.Home.award,
                        dropValues: [dict.Home.yes, "No"],
                        dropOpen: drops.creatorAwardOpen,
                        chosenValue: drops.award,
                        showObject: true,
                        openDropdown: () =>
                          setDrops((prev) => ({
                            ...prev,
                            creatorAwardOpen: !prev.creatorAwardOpen,
                          })),
                        setValue: (item: string) => {
                          setComentarPublicar((prev) => {
                            const arr = [...prev];
                            let col = arr[opcionAbierta?.indice!]?.coleccionar
                              ? arr[opcionAbierta?.indice!]?.coleccionar
                              : { followerOnly: false };

                            col =
                              drops?.award == "No"
                                ? {
                                    followerOnly:
                                      item === dict.Home.seguidor
                                        ? true
                                        : false,
                                  }
                                : ({
                                    ...(arr[opcionAbierta?.indice!]
                                      ?.coleccionar || {}),
                                  } as any);

                            arr[opcionAbierta?.indice!] = {
                              ...arr[opcionAbierta?.indice!],
                              coleccionar: col,
                            };

                            return arr;
                          });

                          setDrops((prev) => ({
                            ...prev,
                            creatorAwardOpen: false,
                            award: item,
                          }));
                        },
                      },
                      {
                        type: "input",
                        title: dict.Home.awardAmount,
                        chosenValue:
                          comentarPublicar?.coleccionar?.amount?.value || "0",
                        showObject:
                          drops.award === dict.Home.yes ? true : false,
                        setValue: (item: string) => {
                          setComentarPublicar((prev) => {
                            const arr = [...prev];
                            let col = arr[opcionAbierta?.indice!]?.coleccionar
                              ? arr[opcionAbierta?.indice!]?.coleccionar
                              : { followerOnly: false };

                            col = {
                              ...col,
                              amount: {
                                ...(col?.amount || {}),
                                value: item,
                                currency:
                                  monedasDisponibles?.find((value) => {
                                    if (
                                      value.contract.address ===
                                      col?.amount?.currency
                                    ) {
                                      return value;
                                    }
                                  })?.contract?.address! ||
                                  monedasDisponibles?.[0]?.contract?.address,
                              },
                            } as any;

                            arr[opcionAbierta?.indice!] = {
                              ...arr[opcionAbierta?.indice!],
                              coleccionar: col,
                            };

                            return arr;
                          });
                        },
                      },
                      {
                        type: "drop",
                        title: dict.Home.moneda,
                        dropValues: monedasDisponibles?.map(
                          (item) => item.symbol
                        ),
                        chosenValue:
                          monedasDisponibles?.find((item) => {
                            if (
                              item.contract?.address ===
                              comentarPublicar?.coleccionar?.amount?.currency
                            ) {
                              return item;
                            }
                          })?.symbol! || monedasDisponibles?.[0]?.symbol,
                        dropOpen: drops.currencyOpen,
                        showObject:
                          drops.award === dict.Home.yes ? true : false,
                        openDropdown: () =>
                          setDrops((prev) => ({
                            ...prev,
                            currencyOpen: !prev.currencyOpen,
                          })),
                        setValue: (item: string) => {
                          setDrops((prev) => ({
                            ...prev,
                            currencyOpen: false,
                          }));

                          setComentarPublicar((prev) => {
                            const arr = [...prev];
                            let col = arr[opcionAbierta?.indice!]?.coleccionar
                              ? arr[opcionAbierta?.indice!]?.coleccionar
                              : { followerOnly: false };

                            col = {
                              ...col,
                              amount: {
                                ...(col?.amount || {}),
                                currency: monedasDisponibles?.find(
                                  (val) => item == val.symbol
                                )?.contract?.address,
                              },
                            } as any;

                            arr[opcionAbierta?.indice!] = {
                              ...arr[opcionAbierta?.indice!],
                              coleccionar: col,
                            };

                            return arr;
                          });
                        },
                      },
                      {
                        type: "input",
                        title: dict.Home.ref,
                        chosenValue: String(
                          comentarPublicar?.coleccionar?.referralFee || "0"
                        ),
                        showObject:
                          drops.award === dict.Home.yes ? true : false,

                        setValue: (item: string) => {
                          setComentarPublicar((prev) => {
                            const arr = [...prev];
                            let col = arr[opcionAbierta?.indice!]?.coleccionar
                              ? arr[opcionAbierta?.indice!]?.coleccionar
                              : { followerOnly: false };

                            col = {
                              ...col,
                              referralFee: Number(item),
                            } as any;

                            arr[opcionAbierta?.indice!] = {
                              ...arr[opcionAbierta?.indice!],
                              coleccionar: col,
                            };

                            return arr;
                          });
                        },
                      },
                      {
                        type: "drop",
                        title: dict.Home.limit,
                        dropValues: [dict.Home.yes, "No"],
                        dropOpen: drops.editionOpen,
                        chosenValue: drops.edition,
                        showObject:
                          drops.award === dict.Home.yes ? true : false,
                        openDropdown: () =>
                          setDrops((prev) => ({
                            ...prev,
                            editionOpen: !prev.editionOpen,
                          })),
                        setValue: (item: string) => {
                          setDrops((prev) => ({
                            ...prev,
                            edition: item,
                          }));

                          setComentarPublicar((prev) => {
                            const arr = [...prev];
                            let col = arr[opcionAbierta?.indice!]?.coleccionar
                              ? arr[opcionAbierta?.indice!]?.coleccionar
                              : { followerOnly: false };

                            col =
                              drops?.edition == "No"
                                ? {
                                    ...col,
                                    collectLimit: undefined,
                                  }
                                : ({
                                    ...col,
                                  } as any);

                            arr[opcionAbierta?.indice!] = {
                              ...arr[opcionAbierta?.indice!],
                              coleccionar: col,
                            };

                            return arr;
                          });

                          setDrops((prev) => ({
                            ...prev,
                            editionOpen: false,
                          }));
                        },
                      },
                      {
                        type: "input",
                        title: dict.Home.edition,
                        chosenValue:
                          comentarPublicar?.coleccionar?.collectLimit || "0",
                        showObject:
                          drops?.edition === dict.Home.yes ? true : false,
                        setValue: (item: string) => {
                          setComentarPublicar((prev) => {
                            const arr = [...prev];
                            let col = arr[opcionAbierta?.indice!]?.coleccionar
                              ? arr[opcionAbierta?.indice!]?.coleccionar
                              : { followerOnly: false };
                            col =
                              drops?.edition == "No"
                                ? {
                                    ...col,
                                    collectLimit: undefined,
                                  }
                                : ({
                                    ...col,
                                    collectLimit: item,
                                  } as any);

                            arr[opcionAbierta?.indice!] = {
                              ...arr[opcionAbierta?.indice!],
                              coleccionar: col,
                            };

                            return arr;
                          });
                        },
                      },
                      {
                        type: "drop",
                        title: dict.Home.time,
                        dropValues: [dict.Home.yes, "No"],
                        dropOpen: drops.timeOpen,
                        chosenValue: drops.time,
                        showObject:
                          drops.award === dict.Home.yes ? true : false,
                        openDropdown: () =>
                          setDrops((prev) => ({
                            ...prev,
                            timeOpen: !prev.timeOpen,
                          })),
                        setValue: (item: string) => {
                          setDrops((prev) => ({
                            ...prev,
                            time: item,
                          }));

                          setComentarPublicar((prev) => {
                            const arr = [...prev];
                            let col = arr[opcionAbierta?.indice!]?.coleccionar
                              ? arr[opcionAbierta?.indice!]?.coleccionar
                              : { followerOnly: false };

                            if (item === dict.Home.yes) {
                              col = {
                                ...col,
                                endsAt: new Date(
                                  new Date()
                                    .getTime()
                                    .toLocaleString("default") +
                                    24 * 60 * 60 * 1000
                                ),
                              } as any;
                            } else {
                              col = {
                                ...col,
                                endsAt: undefined,
                              } as any;
                            }

                            arr[opcionAbierta?.indice!] = {
                              ...arr[opcionAbierta?.indice!],
                              coleccionar: col,
                            };

                            return arr;
                          });

                          setDrops((prev) => ({
                            ...prev,
                            timeOpen: false,
                          }));
                        },
                      },
                    ].map(
                      (
                        item: {
                          type: string;
                          title: string;
                          showObject: boolean;
                          dropOpen?: boolean;
                          chosenValue: string;
                          dropValues?: string[];
                          openDropdown?: () => void;
                          setValue: (item: string) => void;
                        },
                        indexTwo: number
                      ) => {
                        return (
                          item.showObject &&
                          (item.type === "drop" ? (
                            <div
                              className="relative flex items-center justify-center flex-col w-60 h-fit pb-1.5 gap-2"
                              key={indexTwo}
                            >
                              <div className="relative w-full h-fit flex items-start justify-start font-bit text-white text-xs">
                                {item?.title}
                              </div>
                              <div
                                className="relative w-full h-12 p-px rounded-sm flex flex-row items-center justify-center font-bit text-amarillotext-center"
                                id="borderSearch"
                              >
                                <div className="relative bg-offNegro flex flex-row w-full h-full justify-start items-center rounded-sm p-2 gap-2">
                                  <div
                                    className={`relative flex items-center justify-center cursor-pointer w-4 h-3 ${
                                      item.dropOpen && "-rotate-90"
                                    }`}
                                    onClick={() => item.openDropdown!()}
                                  >
                                    <div className="relative w-fit h-fit text-xl">
                                      #
                                    </div>
                                  </div>
                                  <div
                                    className="relative w-full h-full p-1.5 bg-offNegro flex items-center justify-center"
                                    id="searchBar"
                                  >
                                    {item.chosenValue}
                                  </div>
                                </div>
                              </div>
                              {item.dropOpen && (
                                <div
                                  className="absolute flex items-start justify-center w-full h-fit max-height-[7rem] overflow-y-scroll z-50 bg-offNegro top-20 p-px border border-azul rounded-sm"
                                  id="dropDown"
                                >
                                  <div className="relative flex flex-col items-center justify-start w-full h-fit gap-px">
                                    {item.dropValues?.map(
                                      (valor: string, indiceTres: number) => {
                                        return (
                                          <div
                                            key={indiceTres}
                                            className="relative w-full h-8 py-px bg-offNegro items-center justify-center flex text-amarillotext-xs uppercase font-bit hover:bg-oscuro hover:text-white cursor-pointer"
                                            onClick={() => {
                                              item.setValue(
                                                indexTwo === 4
                                                  ? monedasDisponibles[
                                                      indiceTres
                                                    ].contract.address
                                                  : valor
                                              );
                                              item.openDropdown!();
                                            }}
                                          >
                                            {valor}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div
                              className="relative flex items-center justify-center flex-col  w-60 h-fit pb-1.5 gap-2"
                              key={indexTwo}
                            >
                              <div className="relative w-full h-fit flex items-start justify-start font-bit text-white text-xs">
                                {item?.title}
                              </div>
                              <div
                                className="relative w-full h-12 p-px rounded-sm flex flex-row items-center justify-center font-bit text-amarillotext-center"
                                id="borderSearch"
                              >
                                <div
                                  className={`relative flex items-center justify-center cursor-pointer w-4 h-3`}
                                >
                                  <div className="relative w-fit h-fit text-xl">
                                    #
                                  </div>
                                </div>
                                <input
                                  className="relative bg-offNegro flex flex-row w-full h-full justify-start items-center rounded-sm p-2 gap-2"
                                  onChange={(e) =>
                                    item.setValue(e.target.value)
                                  }
                                  value={item.chosenValue || ""}
                                />
                              </div>
                            </div>
                          ))
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpcionAbierta;
