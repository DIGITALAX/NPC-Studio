import { SetStateAction, useEffect, useState } from "react";
import {
  Comment,
  Mirror,
  Post,
  Profile,
  PublicationStats,
  Quote,
} from "../../../../graphql/generated";
import { PublicClient, createWalletClient, custom } from "viem";
import { polygonAmoy } from "viem/chains";
import lensMirror from "@/lib/helpers/lensMirror";
import { Indexar } from "../types/common.types";
import lensMeGusta from "@/lib/helpers/lensMeGusta";
import lensColeccionar from "@/lib/helpers/lensColeccionar";

const useInteracciones = (
  lensConectado: Profile | undefined,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  feedActual: (Quote | Mirror | Post | Comment)[],
  setFeedActual: (
    e: SetStateAction<(Quote | Mirror | Post | Comment)[]>
  ) => void,
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void
) => {
  const [comentariosAbiertos, setComentariosAbiertos] = useState<boolean[]>([]);
  const [abrirMirrorEleccion, setAbrirMirrorEleccion] = useState<boolean[]>([]);
  const [cargandoInteracciones, setCargandoInteracciones] = useState<
    {
      gusta: boolean;
      espejo: boolean;
      coleccion: boolean;
    }[]
  >([]);

  const manejarColeccionar = async (
    id: string,
    tipo: string,
    indice: number
  ) => {
    if (!lensConectado?.id) return;

    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], coleccion: true };
      return updatedArray;
    });

    try {
      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });

      await lensColeccionar(
        id,
        tipo,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion
      );
      actualizarInteracciones(
        indice!,
        {
          hasActed: {
            __typename: "OptimisticStatusResult",
            isFinalisedOnchain: true,
            value: true,
          },
        },
        "countOpenActions",
        true
      );
    } catch (err: any) {
      setErrorInteraccion(true);
    }

    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], coleccion: false };
      return updatedArray;
    });
  };

  const manejarMirror = async (id: string, indice: number) => {
    if (!lensConectado?.id) return;
    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], espejo: true };
      return updatedArray;
    });

    try {
      const clientWallet = createWalletClient({
        chain: polygonAmoy,
        transport: custom((window as any).ethereum),
      });
      await lensMirror(
        id,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion
      );
      actualizarInteracciones(
        indice!,
        {
          hasMirrored: true,
        },
        "mirrors",
        true
      );
    } catch (err: any) {
      setErrorInteraccion(true);
    }

    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], espejo: false };
      return updatedArray;
    });
  };

  const manejarMeGusta = async (
    id: string,
    hasReacted: boolean,
    indice: number
  ) => {
    if (!lensConectado?.id) return;
    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], gusta: true };
      return updatedArray;
    });

    try {
      await lensMeGusta(id, hasReacted, setIndexar, setErrorInteraccion);
      actualizarInteracciones(
        indice!,
        {
          hasReacted: hasReacted ? false : true,
        },
        "reactions",
        hasReacted ? false : true
      );
    } catch (err: any) {
      setErrorInteraccion(true);
    }

    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], gusta: false };
      return updatedArray;
    });
  };

  useEffect(() => {
    if (feedActual?.length > 0) {
      setComentariosAbiertos(
        Array.from({ length: feedActual?.length + 1 }, () => false)
      );
      setAbrirMirrorEleccion(
        Array.from({ length: feedActual?.length + 1 }, () => false)
      );
      setCargandoInteracciones(
        Array.from({ length: feedActual?.length + 1 }, () => ({
          gusta: false,
          espejo: false,
          coleccion: false,
        }))
      );
    }
  }, [feedActual?.length]);

  const actualizarInteracciones = (
    indice: number,
    valor: Object,
    estadistica: string,
    aumentar: boolean
  ) => {
    const feed = [...feedActual];
    feed[indice] = (
      feed[indice]?.__typename === "Mirror"
        ? {
            ...feed[indice],
            mirrorOn: {
              ...(feed[indice] as Mirror)?.mirrorOn,
              operations: {
                ...(feed[indice] as Mirror).mirrorOn?.operations,
                ...valor,
              },
              stats: {
                ...(feed[indice] as Mirror)?.mirrorOn?.stats,
                [estadistica]:
                  (feed[indice] as Mirror)?.mirrorOn?.stats?.[
                    estadistica as keyof PublicationStats
                  ] + (aumentar ? 1 : -1),
              },
            },
          }
        : {
            ...feed[indice],
            operations: {
              ...(feed[indice] as Post)?.operations,
              ...valor,
            },
            stats: {
              ...(feed[indice] as Post)?.stats,
              [estadistica]:
                (feed[indice] as Post)?.stats?.[
                  estadistica as keyof PublicationStats
                ] + (aumentar ? 1 : -1),
            },
          }
    ) as Post;

    setFeedActual(feed);
  };

  return {
    comentariosAbiertos,
    setComentariosAbiertos,
    abrirMirrorEleccion,
    setAbrirMirrorEleccion,
    cargandoInteracciones,
    manejarMeGusta,
    manejarMirror,
    manejarColeccionar,
  };
};

export default useInteracciones;
