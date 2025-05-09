import {
  ACCEPTED_TOKENS,
  ASSETS,
  INFURA_GATEWAY_INTERNAL,
} from "@/app/lib/constants";
import Image from "next/legacy/image";
import { FunctionComponent, JSX, useContext } from "react";
import { ModalContext } from "@/app/providers";
import useCollectConfig from "../hooks/useCollectConfig";
import { SimpleCollect } from "../../Common/types/common.types";
import { evmAddress } from "@lens-protocol/client";

export const CollectConfig: FunctionComponent<{ dict: any }> = ({
  dict,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const { drops, setDrops } = useCollectConfig(dict);
  return (
    <div
      className="inset-0 justify-center fixed z-200 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        contexto?.setCollectOptions({
          open: false,
          index: 0,
        });
      }}
    >
      <div
        className="relative flex w-fit h-fit overflow-y-scroll place-self-center bg-oscuro border border-white cursor-default rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100vw] max-w-[64rem] h-[calc(100vw*(40/64))] max-h-[40rem] flex items-center justify-center">
          <Image
            src={`${INFURA_GATEWAY_INTERNAL}QmUsrPxWX5wcnmVGt5WykDgTNDM3KHsjSrMZSxZui5u4rC`}
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
              <div className="relative w-full h-full flex flex-col flex-wrap justify-start items-center gap-3 break-words p-3">
                <div className="relative h-full w-full flex flex-wrap gap-4 items-start justify-center">
                  {[
                    {
                      type: "drop",
                      title: dict.Home.who,
                      dropValues: [dict.Home.todos, dict.Home.seguidor],
                      dropOpen: drops.whoCollectsOpen,
                      chosenValue: contexto?.comentarPublicar?.[
                        contexto?.collectOptions?.index
                      ]?.coleccionar?.followerOnGraph
                        ? dict.Home.seguidor
                        : dict.Home.todos,
                      showObject: true,
                      openDropdown: () =>
                        setDrops((prev) => ({
                          ...prev,
                          whoCollectsOpen: !prev.whoCollectsOpen,
                        })),
                      setValue: (item: string) => {
                        contexto?.setComentarPublicar((prev) => {
                          const arr = [...prev];
                          let col = arr[contexto?.collectOptions?.index]
                            ?.coleccionar
                            ? arr[contexto?.collectOptions?.index]?.coleccionar
                            : {};

                          let followerOnGraph =
                            item === dict.Home.seguidor
                              ? {
                                  followerOnGraph: {
                                    globalGraph: true as true,
                                  },
                                }
                              : {};

                          if (!followerOnGraph?.followerOnGraph) {
                            const { followerOnGraph, ...all } = col!;
                            col = all;
                          }

                          col =
                            drops?.award == "No"
                              ? {
                                  ...col,
                                  ...followerOnGraph,
                                  payToCollect: null,
                                }
                              : {
                                  ...col,
                                  ...followerOnGraph,
                                };

                          arr[contexto?.collectOptions?.index] = {
                            ...arr[contexto?.collectOptions?.index],
                            coleccionar: col as SimpleCollect,
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
                        contexto?.setComentarPublicar((prev) => {
                          const arr = [...prev];
                          let col = arr[contexto?.collectOptions?.index]
                            ?.coleccionar
                            ? arr[contexto?.collectOptions?.index]?.coleccionar
                            : {};

                          let followerOnGraph =
                            contexto?.comentarPublicar?.[
                              contexto?.collectOptions?.index
                            ]?.coleccionar?.followerOnGraph ===
                            dict.Home.seguidor
                              ? {
                                  followerOnGraph: {
                                    globalGraph: true as true,
                                  },
                                }
                              : {};

                          if (!followerOnGraph?.followerOnGraph) {
                            const { followerOnGraph, ...all } = col!;
                            col = all;
                          }

                          col =
                            item == "No"
                              ? {
                                  ...col,
                                  ...followerOnGraph,
                                  payToCollect: null,
                                }
                              : ({
                                  ...col,
                                  payToCollect: {
                                    ...col?.payToCollect,
                                    referralShare: 0,
                                    amount: {
                                      value: "10",
                                      currency: evmAddress(
                                        ASSETS[0]?.contract?.address?.toLowerCase()
                                      ),
                                    },
                                  },
                                } as any);

                          arr[contexto?.collectOptions?.index] = {
                            ...arr[contexto?.collectOptions?.index],
                            coleccionar: col as SimpleCollect,
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
                        contexto?.comentarPublicar[
                          contexto?.collectOptions?.index
                        ]?.coleccionar?.payToCollect?.amount?.value.toString() ||
                        "10",
                      showObject: drops.award === dict.Home.yes ? true : false,
                      setValue: (item: string) => {
                        if (isNaN(Number(item))) return;
                        contexto?.setComentarPublicar((prev) => {
                          const arr = [...prev];
                          let col = arr[contexto?.collectOptions?.index]
                            ?.coleccionar
                            ? arr[contexto?.collectOptions?.index]?.coleccionar
                            : {
                                payToCollect: {
                                  amount: {
                                    value: "10",
                                    currency:
                                      ASSETS[0]?.contract?.address?.toLowerCase(),
                                  },
                                },
                              };

                          col = {
                            ...col,
                            payToCollect: {
                              ...col?.payToCollect,
                              amount: {
                                currency:
                                  ASSETS?.find(
                                    (at) =>
                                      at.contract?.address?.toLowerCase() ==
                                      contexto?.comentarPublicar[
                                        contexto?.collectOptions?.index
                                      ]?.coleccionar?.payToCollect?.amount?.currency?.toLowerCase()
                                  )?.contract?.address ??
                                  ASSETS[0]?.contract?.address?.toLowerCase(),
                                value: item,
                              },
                            },
                          } as SimpleCollect;

                          arr[contexto?.collectOptions?.index] = {
                            ...arr[contexto?.collectOptions?.index],
                            coleccionar: col as SimpleCollect,
                          };

                          return arr;
                        });
                      },
                    },
                    {
                      type: "drop",
                      title: dict.Home.moneda,
                      dropValues: ASSETS?.map((item) => item.symbol),
                      chosenValue:
                        ASSETS?.find((item) => {
                          if (
                            item.contract?.address?.toLowerCase() ==
                            contexto?.comentarPublicar[
                              contexto?.collectOptions?.index
                            ]?.coleccionar?.payToCollect?.amount?.currency?.toLowerCase()
                          ) {
                            return item;
                          }
                        })?.symbol ?? ASSETS?.[0]?.symbol,
                      dropOpen: drops.currencyOpen,
                      showObject: drops.award === dict.Home.yes ? true : false,
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

                        contexto?.setComentarPublicar((prev) => {
                          const arr = [...prev];
                          let col = arr[contexto?.collectOptions?.index]
                            ?.coleccionar
                            ? arr[contexto?.collectOptions?.index]?.coleccionar
                            : {
                                payToCollect: {
                                  amount: {
                                    value: "10",
                                    currency:
                                      ASSETS[0]?.contract?.address?.toLowerCase(),
                                  },
                                },
                              };

                          col = {
                            ...col,
                            payToCollect: {
                              ...col?.payToCollect,
                              amount: {
                                ...col?.payToCollect?.amount,
                                currency: ASSETS?.find(
                                  (val) => item == val.symbol
                                )?.contract?.address,
                              },
                            },
                          } as SimpleCollect;

                          arr[contexto?.collectOptions?.index] = {
                            ...arr[contexto?.collectOptions?.index],
                            coleccionar: col as SimpleCollect,
                          };

                          return arr;
                        });
                      },
                    },
                    {
                      type: "input",
                      title: dict.Home.ref,
                      chosenValue: String(
                        contexto?.comentarPublicar?.[
                          contexto?.collectOptions?.index
                        ]?.coleccionar?.payToCollect?.referralShare || 0
                      ),
                      showObject: drops.award === dict.Home.yes ? true : false,
                      setValue: (item: string) => {
                        if (isNaN(Number(item))) return;
                        contexto?.setComentarPublicar((prev) => {
                          const arr = [...prev];
                          let col = arr[contexto?.collectOptions?.index]
                            ?.coleccionar
                            ? arr[contexto?.collectOptions?.index]?.coleccionar
                            : {
                                payToCollect: {
                                  amount: {
                                    value: "10",
                                    curency:
                                      ASSETS[0]?.contract?.address?.toLowerCase(),
                                  },
                                },
                              };

                          col = {
                            ...col,
                            payToCollect: {
                              ...col?.payToCollect,
                              referralShare: Number(item),
                            },
                          } as SimpleCollect;

                          arr[contexto?.collectOptions?.index] = {
                            ...arr[contexto?.collectOptions?.index],
                            coleccionar: col as SimpleCollect,
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
                      showObject: true,
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

                        contexto?.setComentarPublicar((prev) => {
                          const arr = [...prev];
                          let col = arr[contexto?.collectOptions?.index]
                            ?.coleccionar
                            ? arr[contexto?.collectOptions?.index]?.coleccionar
                            : {};

                          col =
                            item == "No"
                              ? ({
                                  ...col,
                                  collectLimit: null,
                                } as SimpleCollect)
                              : ({
                                  ...col,
                                } as SimpleCollect);

                          arr[contexto?.collectOptions?.index] = {
                            ...arr[contexto?.collectOptions?.index],
                            coleccionar: col as SimpleCollect,
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
                      chosenValue: String(
                        contexto?.comentarPublicar?.[
                          contexto?.collectOptions?.index
                        ]?.coleccionar?.collectLimit || "1"
                      ),
                      showObject:
                        drops?.edition === dict.Home.yes ? true : false,
                      setValue: (item: string) => {
                        if (isNaN(Number(item))) return;
                        contexto?.setComentarPublicar((prev) => {
                          const arr = [...prev];
                          let col = arr[contexto?.collectOptions?.index]
                            ?.coleccionar
                            ? arr[contexto?.collectOptions?.index]?.coleccionar
                            : {};
                          col =
                            drops?.edition == "No"
                              ? ({
                                  ...col,
                                  collectLimit: null,
                                } as SimpleCollect)
                              : ({
                                  ...col,
                                  collectLimit: Number(item),
                                } as SimpleCollect);

                          arr[contexto?.collectOptions?.index] = {
                            ...arr[contexto?.collectOptions?.index],
                            coleccionar: col as SimpleCollect,
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
                      showObject: true,
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

                        contexto?.setComentarPublicar((prev) => {
                          const arr = [...prev];
                          let col = arr[contexto?.collectOptions?.index]
                            ?.coleccionar
                            ? arr[contexto?.collectOptions?.index]?.coleccionar
                            : {};

                          if (item === dict.Home.yes) {
                            col = {
                              ...col,

                              endsAt: new Date(
                                new Date().getTime() + 24 * 60 * 60 * 1000
                              ) as any,
                            } as SimpleCollect;
                          } else {
                            col = {
                              ...col,
                              endsAt: null,
                            } as SimpleCollect;
                          }

                          arr[contexto?.collectOptions?.index] = {
                            ...arr[contexto?.collectOptions?.index],
                            coleccionar: col as SimpleCollect,
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
                              className="relative w-full h-12 p-px rounded-sm flex flex-row items-center justify-center font-bit text-amarillo text-center"
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
                                          className="relative w-full h-8 py-px bg-offNegro items-center justify-center flex text-amarillo text-xs uppercase font-bit hover:bg-oscuro hover:text-white cursor-pointer"
                                          onClick={() => {
                                            item.setValue(
                                              indexTwo === 4
                                                ? ASSETS[indiceTres].symbol
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
                              className="relative w-full h-12 p-px rounded-sm flex flex-row items-center justify-center font-bit text-amarillo text-center"
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
                                onChange={(e) => item.setValue(e.target.value)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectConfig;
