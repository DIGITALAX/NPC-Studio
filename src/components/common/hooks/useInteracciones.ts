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
import { polygon } from "viem/chains";
import lensMirror from "@/lib/helpers/lensMirror";
import { Indexar, Notificacion } from "../types/common.types";
import lensMeGusta from "@/lib/helpers/lensMeGusta";
import lensColeccionar from "@/lib/helpers/lensColeccionar";
import { getCatalogoPublicacion } from "../../../../graphql/autograph/queries/getCatalogo";
import { getColeccionPublicacion } from "../../../../graphql/autograph/queries/getColeccion";
import { AutographType } from "@/components/game/types/game.types";
import { numberToAutograph } from "@/lib/constants";
import { Compra } from "@/components/compras/types/compras.types";

const useInteracciones = (
  lensConectado: Profile | undefined,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  feedActual: (Quote | Mirror | Post | Comment)[],
  setFeedActual: (
    e: SetStateAction<(Quote | Mirror | Post | Comment)[]>
  ) => void,
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  setCarrito: (
    e: SetStateAction<{
      compras: Compra[];
      abierto: boolean;
    }>
  ) => void,
  setMostrarNotificacion: (e: SetStateAction<Notificacion>) => void,
  conectado: boolean,
  openConnectModal: (() => void) | undefined,
  manejarLens: () => Promise<void>
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
    if (!lensConectado?.id) {
      if (conectado) {
        manejarLens();
      } else {
        openConnectModal && openConnectModal();
      }
      return;
    }

    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], coleccion: true };
      return updatedArray;
    });

    try {
      const clientWallet = createWalletClient({
        chain: polygon,
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
    if (!lensConectado?.id) {
      if (conectado) {
        manejarLens();
      } else {
        openConnectModal && openConnectModal();
      }
      return;
    }

    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], espejo: true };
      return updatedArray;
    });

    try {
      const clientWallet = createWalletClient({
        chain: polygon,
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
    if (!lensConectado?.id) {
      if (conectado) {
        manejarLens();
      } else {
        openConnectModal && openConnectModal();
      }
      return;
    }

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
        Array.from({ length: feedActual?.length }, () => false)
      );
      setAbrirMirrorEleccion(
        Array.from({ length: feedActual?.length }, () => false)
      );
      setCargandoInteracciones(
        Array.from({ length: feedActual?.length }, () => ({
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

  const manejarAccionAbierta = async (post: Post, indice: number) => {
    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], coleccion: true };
      return updatedArray;
    });
    try {
      const datos = await getCatalogoPublicacion(
        String(parseInt(post?.id?.split("-")?.[0], 16)),
        String(parseInt(post?.id?.split("-")?.[1], 16))
      );

      let elemento = {
        elemento: {
          paginas: datos?.data?.autographCreateds?.items?.[0].pages,
          tokenes: datos?.data?.autographCreateds?.items?.[0].acceptedTokens,
          uri: datos?.data?.autographCreateds?.items?.[0].uri,
          disenador: datos?.data?.autographCreateds?.items?.[0].designer,
          precio: datos?.data?.autographCreateds?.items?.[0].price,
          id: datos?.data?.autographCreateds?.items?.[0].id,
          pubId: datos?.data?.autographCreateds?.items?.[0].pubId,
          profileId: datos?.data?.autographCreateds?.items?.[0].profileId,
          cantidad: datos?.data?.autographCreateds?.items?.[0].amount,
          minteado: datos?.data?.autographCreateds?.items?.[0].mintedTokens,
          paginasContadas: datos?.data?.autographCreateds?.items?.[0].pageCount,
          tipo: AutographType.Catalog,
        },
        token: datos?.data?.autographCreateds?.items?.[0]?.acceptedTokens?.[0],
        cantidad: 1,
        tipo: AutographType.Catalog,
        color: "",
        tamano: "",
      };

      let agotado =
        elemento?.elemento?.minteado == elemento?.elemento?.cantidad;

      if (!elemento) {
        const datos = await getColeccionPublicacion(
          [String(parseInt(post?.id?.split("-")?.[0], 16))],
          [String(parseInt(post?.id?.split("-")?.[1], 16))]
        );

        let elemento = {
          elemento: {
            galeria:
              datos?.data?.autographCreateds?.items?.[0]?.collectionMetadata
                .gallery,
            imagen:
              datos?.data?.autographCreateds?.items?.[0]?.collectionMetadata
                .image,
            id: datos?.data?.autographCreateds?.items?.[0]?.collectionId,
            cantidad: datos?.data?.autographCreateds?.items?.[0]?.amount,
            tokenes: datos?.data?.autographCreateds?.items?.[0]?.acceptedTokens,
            tokenesMinteados:
              datos?.data?.autographCreateds?.items?.[0]?.mintedTokens,
            precio: datos?.data?.autographCreateds?.items?.[0]?.price,
            tipo: numberToAutograph[
              Number(datos?.data?.autographCreateds?.items?.[0]?.type)
            ],
            titulo:
              datos?.data?.autographCreateds?.items?.[0]?.collectionMetadata
                .title,
            descripcion:
              datos?.data?.autographCreateds?.items?.[0]?.collectionMetadata
                .description,
            etiquetas:
              datos?.data?.autographCreateds?.items?.[0]?.collectionMetadata
                .tags,
            npcIdiomas:
              datos?.data?.autographCreateds?.items?.[0]?.collectionMetadata
                .locales,
            npcInstrucciones:
              datos?.data?.autographCreateds?.items?.[0]?.collectionMetadata
                .instructions,
            npcs: datos?.data?.autographCreateds?.items?.[0]?.collectionMetadata
              .npcs,
            pubIds: datos?.data?.autographCreateds?.items?.[0]?.pubIds,
            profileIds: datos?.data?.autographCreateds?.items?.[0]?.profileIds,
            coleccionId:
              datos?.data?.autographCreateds?.items?.[0]?.collectionId,
            galeriaId: datos?.data?.autographCreateds?.items?.[0]?.galleryId,
          },
          token:
            datos?.data?.autographCreateds?.items?.[0]?.acceptedTokens?.[0],
          cantidad: 1,
          tipo: numberToAutograph[
            Number(datos?.data?.collections?.items?.[0].type)
          ],
          color:
            numberToAutograph[
              Number(datos?.data?.autographCreateds?.items?.[0]?.type)
            ] == AutographType.Hoodie ||
            numberToAutograph[
              Number(datos?.data?.autographCreateds?.items?.[0]?.type)
            ] == AutographType.Shirt ||
            numberToAutograph[
              Number(datos?.data?.autographCreateds?.items?.[0]?.type)
            ] == AutographType.All
              ? "black"
              : "",
          tamano:
            numberToAutograph[
              Number(datos?.data?.autographCreateds?.items?.[0]?.type)
            ] == AutographType.Hoodie ||
            numberToAutograph[
              Number(datos?.data?.autographCreateds?.items?.[0]?.type)
            ] == AutographType.Shirt ||
            numberToAutograph[
              Number(datos?.data?.autographCreateds?.items?.[0]?.type)
            ] == AutographType.All
              ? "m"
              : "",
        };

        agotado =
          elemento?.elemento?.tokenesMinteados?.length ==
          elemento?.elemento?.cantidad;
      }

      if (!agotado) {
        setCarrito((prev) => {
          let compras = prev.compras;

          const el = prev.compras.find((el) => {
            const { profile: _, ...elSinProfile } = el.elemento as any;

            return (
              elSinProfile.elemento == elemento?.elemento &&
              elSinProfile.token == elemento?.token &&
              elSinProfile.tamano == elemento?.tamano &&
              elSinProfile.color == elemento?.color
            );
          });

          if (el) {
            compras = prev.compras.map((el) =>
              el.elemento == elemento?.elemento
                ? {
                    ...el,
                    cantidad: el.cantidad + 1,
                  }
                : el
            );
          } else {
            compras = [...prev.compras, elemento as any];
          }
          return {
            ...prev,
            compras,
          };
        });
      } else {
        setMostrarNotificacion(Notificacion.Agotado);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setCargandoInteracciones((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = { ...updatedArray[indice], coleccion: false };
      return updatedArray;
    });
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
    manejarAccionAbierta,
  };
};

export default useInteracciones;
