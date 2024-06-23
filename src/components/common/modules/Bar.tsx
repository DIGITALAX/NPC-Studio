import { FunctionComponent } from "react";
import Image from "next/legacy/image";
import { AiOutlineLoading } from "react-icons/ai";
import { Post, Quote } from "../../../../graphql/generated";
import createProfilePicture from "@/lib/helpers/createProfilePicture";
import { INFURA_GATEWAY } from "@/lib/constants";
import numeral from "numeral";
import { BarProps } from "../types/common.types";
import manejarLogicaColeccion from "@/lib/helpers/manejarLogicaColeccion";

const Bar: FunctionComponent<BarProps> = ({
  indice,
  elemento,
  abrirMirrorEleccion,
  setAbrirMirrorEleccion,
  cargandoInteracciones,
  setComentariosAbiertos,
  setAbrirCita,
  manejarMeGusta,
  manejarMirror,
  manejarColeccionar,
  setSeguirColeccionar,
}): JSX.Element => {
  const profilePicture = createProfilePicture(
    (elemento?.__typename == "Mirror" ? elemento?.mirrorOn : (elemento as Post))
      ?.by?.metadata?.picture
  );
  return (
    <div className="relative w-full justify-between flex flex-col sm:flex-row items-between sm:items-center gap-2">
      <div className="relative w-fit h-fit flex flex-row items-start sm:items-center gap-2 justify-center">
        {[
          ["QmPRRRX1S3kxpgJdLC4G425pa7pMS1AGNnyeSedngWmfK3", "Mirrors"],
          ["QmT1aZypVcoAWc6ffvrudV3JQtgkL8XBMjYpJEfdFwkRMZ", "Likes"],
          ["QmXD3LnHiiLSqG2TzaNd1Pmhk2nVqDHDqn8k7RtwVspE6n", "Comments"],
        ].map((image: string[], indexTwo: number) => {
          const functions = [
            () =>
              setAbrirMirrorEleccion!((prev) => {
                const choices = [...prev!];
                choices[indice] = !choices[indice];
                return choices;
              }),
            () =>
              manejarMeGusta(
                elemento?.id,
                (elemento?.__typename === "Mirror"
                  ? elemento?.mirrorOn
                  : (elemento as Post)
                )?.operations?.hasReacted,
                indice
              ),
            () =>
              setComentariosAbiertos((prev) => {
                const arr = [...prev];
                arr[indice] = !prev[indice];
                return arr;
              }),
          ];

          const loaders = [cargandoInteracciones?.gusta];

          const stats = [
            elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn?.stats?.mirrors! +
                elemento?.mirrorOn?.stats?.quotes!
              : (elemento as Post)?.stats?.mirrors! +
                (elemento as Post)?.stats?.quotes!,
            elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn?.stats?.reactions
              : (elemento as Post)?.stats?.reactions,
            elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn?.stats?.comments
              : (elemento as Post)?.stats?.comments,
          ];

          const responded = [
            (elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn
              : (elemento as Post)
            )?.operations?.hasMirrored ||
              (elemento?.__typename === "Mirror"
                ? elemento?.mirrorOn
                : (elemento as Post)
              )?.operations?.hasQuoted,
            (elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn
              : (elemento as Post)
            )?.operations?.hasReacted,
          ];

          return (
            <div
              className={`relative w-full h-full flex flex-row items-center justify-center gap-1 font-earl ${
                (elemento?.__typename === "Mirror"
                  ? elemento?.mirrorOn
                  : (elemento as Post)
                )?.isEncrypted
                  ? "text-black"
                  : "text-white"
              }`}
              key={indexTwo}
            >
              <div
                className={`relative w-fit h-fit flex cursor-pointer items-center justify-center active:scale-95 ${
                  responded?.[indexTwo] && "mix-blend-hard-light hue-rotate-60"
                }`}
              >
                {loaders[indexTwo] && image[1] === "Likes" ? (
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
                className={`relative w-fit h-fit flex items-center justify-center text-center text-sm ${
                  (stats[indexTwo] > 0 || image[1] === "Comments") &&
                  "cursor-pointer active:scale-95"
                }`}
              >
                {numeral(stats[indexTwo]).format("0a")}
              </div>
            </div>
          );
        })}
      </div>
      {abrirMirrorEleccion?.[indice] && (
        <div
          className={`absolute w-fit h-fit flex flex-row gap-4 p-2 items-center justify-center bg-black rounded-sm left-2 -top-8 border border-white z-50`}
        >
          {[
            "QmPRRRX1S3kxpgJdLC4G425pa7pMS1AGNnyeSedngWmfK3",
            "QmfDNH347Vph4b1tEuegydufjMU2QwKzYnMZCjygGvvUMM",
          ].map((image: string, indexTwo: number) => {
            const functions: ((() => void) | (() => Promise<void>))[] = [
              () =>
                (
                  manejarMirror as (id: string, indice: number) => Promise<void>
                )(
                  elemento?.__typename === "Mirror"
                    ? elemento?.mirrorOn?.id
                    : elemento?.id,
                  indice
                ),
              () => setAbrirCita(elemento as Quote),
            ];
            const loaders = [cargandoInteracciones?.espejo];
            return (
              <div
                key={indexTwo}
                className="relative w-fit h-fit flex cursor-pointer items-center justify-center active:scale-95 hover:opacity-70"
                onClick={() => !loaders[indexTwo] && functions[indexTwo]()}
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
                      src={`${INFURA_GATEWAY}/ipfs/${image}`}
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
          className="relative flex items-center justify-center rounded-full w-5 h-5 cursor-pointer"
          id="pfp"
        >
          {profilePicture && (
            <Image
              layout="fill"
              src={profilePicture}
              draggable={false}
              className="rounded-full"
              objectFit="cover"
            />
          )}
        </div>
        <div
          className={`relative w-5 h-5 items-center justify-center flex ${
            (elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn
              : (elemento as Post)
            )?.openActionModules?.[0]?.__typename ===
              "SimpleCollectOpenActionSettings" ||
            (elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn
              : (elemento as Post)
            )?.openActionModules?.[0]?.__typename ===
              "MultirecipientFeeCollectOpenActionSettings"
              ? "cursor-pointer active:scale-95"
              : "opacity-70"
          } ${cargandoInteracciones?.coleccion && "animate-spin"} ${
            (elemento?.__typename === "Mirror"
              ? elemento?.mirrorOn
              : (elemento as Post)
            )?.operations?.hasActed?.value &&
            "mix-blend-hard-light hue-rotate-60"
          }`}
          onClick={() =>
            manejarLogicaColeccion(
              (elemento?.__typename === "Mirror"
                ? elemento?.mirrorOn
                : (elemento as Post)) as Post,
              cargandoInteracciones?.coleccion!,
              indice,
              manejarColeccionar,
              setSeguirColeccionar
            )
          }
        >
          {cargandoInteracciones?.coleccion ? (
            <AiOutlineLoading size={15} color="white" />
          ) : (
            <Image
              layout="fill"
              draggable={false}
              src={`${INFURA_GATEWAY}/ipfs/QmZ4v5pzdnCBeyKnS9VrjZiEAbUpAVy8ECArNcpxBt6Tw4`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bar;
