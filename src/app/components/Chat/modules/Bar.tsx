import { FunctionComponent, JSX, useContext } from "react";
import Image from "next/legacy/image";
import { AiOutlineLoading } from "react-icons/ai";
import { INFURA_GATEWAY } from "@/app/lib/constants";
import numeral from "numeral";
import useInteraccion from "../hooks/useInteraccion";
import { BarProps } from "../types/chat.types";
import { ModalContext } from "@/app/providers";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";

const Bar: FunctionComponent<BarProps> = ({
  indice,
  elemento,
  dict,
  setComentariosAbiertos,
}): JSX.Element => {
  const contexto = useContext(ModalContext);
  const {
    handleMirror,
    handleLike,
    interactions,
    interactionLoading,
    setOpenMirror,
    openMirror,
  } = useInteraccion(dict, elemento);

  return (
    <div className="relative w-full justify-between flex flex-col sm:flex-row items-between sm:items-center gap-2 flex-wrap">
      <div className="relative w-fit h-fit flex flex-row items-start sm:items-center gap-2 justify-center">
        {[
          ["QmPRRRX1S3kxpgJdLC4G425pa7pMS1AGNnyeSedngWmfK3", dict.Home.Mirrors],
          ["QmT1aZypVcoAWc6ffvrudV3JQtgkL8XBMjYpJEfdFwkRMZ", dict.Home.Likes],
          [
            "QmXD3LnHiiLSqG2TzaNd1Pmhk2nVqDHDqn8k7RtwVspE6n",
            dict.Home.Comments,
          ],
        ].map((image: string[], indexTwo: number) => {
          const functions = [
            () => setOpenMirror(!openMirror),
            () =>
              handleLike(
                elemento?.id,
                interactions?.hasUpvoted ? "DOWNVOTE" : "UPVOTE"
              ),
            () =>
              setComentariosAbiertos((prev) => {
                let arr = [...prev];
                arr[indice] = !arr[indice];

                return arr;
              }),
          ];

          const loaders = [
            interactionLoading?.mirror,
            interactionLoading?.like,
            interactionLoading?.comment,
          ];

          const stats = [
            interactions?.reposts + interactions?.quotes,
            interactions?.upvotes,
            interactions?.comments,
          ];

          const responded = [
            interactions?.hasReposted || interactions?.hasQuoted,
            interactions?.hasUpvoted,
          ];

          return (
            <div
              className={`relative w-full h-full flex flex-row items-center justify-center gap-1 font-earl text-white`}
              key={indexTwo}
            >
              <div
                className={`relative w-fit h-fit flex cursor-pointer items-center justify-center active:scale-95 ${
                  responded?.[indexTwo] && "mix-blend-hard-light hue-rotate-60"
                }`}
              >
                {loaders[indexTwo] && image[1] === dict.Home.Likes ? (
                  <div className="relative w-fit h-fit animate-spin flex items-center justify-center">
                    <AiOutlineLoading size={15} color="white" />
                  </div>
                ) : (
                  <div
                    className={`relative w-3.5 h-3.5 flex items-center justify-center ${
                      functions[indexTwo]
                        ? "cursor-pointer active:scale-95"
                        : "opacity-70"
                    } `}
                    onClick={() => functions[indexTwo]?.()}
                  >
                    <Image
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${image[0]}`}
                      draggable={false}
                    />
                  </div>
                )}
              </div>
              <div
                className={`relative w-fit h-fit flex items-center justify-center text-center text-sm whitespace-nowrap ${
                  stats[indexTwo] > 0 && "cursor-pointer active:scale-95"
                }`}
                onClick={() =>
                  stats[indexTwo] > 0 &&
                  contexto?.setMostrarInteracciones({
                    abierto: true,
                    tipo: image[1],
                    id: elemento?.id,
                  })
                }
              >
                {numeral(stats[indexTwo]).format("0a")}
              </div>
            </div>
          );
        })}
      </div>
      {openMirror && (
        <div
          className={`absolute w-fit h-fit flex flex-row gap-4 p-2 items-center justify-center bg-black rounded-sm left-2 -top-8 border border-white z-50`}
        >
          {[
            [
              "QmPRRRX1S3kxpgJdLC4G425pa7pMS1AGNnyeSedngWmfK3",
              dict.Home.Mirrors,
            ],
            ["QmfDNH347Vph4b1tEuegydufjMU2QwKzYnMZCjygGvvUMM", dict.Home.Quote],
          ].map((image: string[], indexTwo: number) => {
            const functions: ((() => void) | (() => Promise<void>))[] = [
              () => handleMirror(elemento?.id),
              () =>
                contexto?.setCitaAbierta({
                  open: true,
                  post: elemento,
                }),
            ];
            const loaders = [interactionLoading?.mirror];
            return (
              <div
                key={indexTwo}
                className="relative w-fit h-fit flex cursor-pointer items-center justify-center active:scale-95 hover:opacity-70"
                onClick={() => !loaders[indexTwo] && functions[indexTwo]()}
                title={image[1]}
              >
                {loaders[indexTwo] && indexTwo == 0 ? (
                  <div className="relative w-fit h-fit animate-spin flex items-center justify-center">
                    <AiOutlineLoading size={15} color="white" />
                  </div>
                ) : (
                  <div
                    className={
                      "relative w-4 h-4 flex items-center justify-center cursor-pointer active:scale-95"
                    }
                  >
                    <Image
                      layout="fill"
                      src={`${INFURA_GATEWAY}/ipfs/${image[0]}`}
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="relative w-fit h-fit flex flex-row gap-2 items-end sm:items-center justify-center ml-auto">
        <div
          className="relative flex items-center justify-center rounded-full w-5 h-5 cursor-pointer border border-white bg-black"
          title={dict.Home.Perfil}
          onClick={() => contexto?.setMostrarPerfil(elemento?.author?.address)}
        >
          {elemento?.author?.metadata?.picture && (
            <Image
              layout="fill"
              src={handleProfilePicture(elemento?.author?.metadata?.picture)}
              draggable={false}
              className="rounded-full"
              objectFit="cover"
            />
          )}
        </div>
        <div
          className="relative flex flex-row gap-1 items-center justify-center"
          title={dict.Home.Collect}
        >
          <div
            className={`relative w-5 h-5 items-center justify-center flex ${
              elemento?.actions?.find(
                (action) => action?.__typename == "SimpleCollectAction"
              )
                ? "cursor-pointer active:scale-95"
                : "opacity-70"
            } ${interactionLoading?.collect && "animate-spin"} ${
              interactions?.hasSimpleCollected &&
              "mix-blend-hard-light hue-rotate-60"
            }`}
            onClick={async () =>
              !interactionLoading?.collect &&
              elemento?.actions?.find(
                (action) => action?.__typename == "SimpleCollectAction"
              ) &&
              contexto?.setSimpleCollect({
                open: true,
                post: elemento,
              })
            }
          >
            {interactionLoading?.collect ? (
              <AiOutlineLoading size={15} color="white" />
            ) : (
              <Image
                layout="fill"
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/QmZ4v5pzdnCBeyKnS9VrjZiEAbUpAVy8ECArNcpxBt6Tw4`}
              />
            )}
          </div>
          {Number(interactions?.collects) > 0 && (
            <div
              className={`relative w-fit h-fit flex items-center justify-center text-center text-sm whitespace-nowrap ${
                interactions?.collects > 0 && "cursor-pointer active:scale-95"
              }`}
              onClick={() =>
                interactions?.collects > 0 &&
                contexto?.setMostrarInteracciones({
                  abierto: true,
                  tipo: "Acts",
                  id: elemento?.id,
                })
              }
            >
              {numeral(interactions?.collects).format("0a")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bar;
