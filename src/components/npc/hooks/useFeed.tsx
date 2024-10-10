import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Comment,
  LimitType,
  Mirror,
  Post,
  Profile,
  PublicationStats,
  PublicationType,
  Quote,
} from "../../../../graphql/generated";
import getPublications from "../../../../graphql/lens/queries/publications";
import lensMeGusta from "@/lib/helpers/lensMeGusta";
import { createWalletClient, custom, PublicClient } from "viem";
import { polygon } from "viem/chains";
import lensMirror from "@/lib/helpers/lensMirror";
import lensColeccionar from "@/lib/helpers/lensColeccionar";
import { Indexar } from "@/components/common/types/common.types";
import subirContenido from "@/lib/helpers/subirContenido";
import publicarLens from "@/lib/helpers/publicarLens";
import { ComentarPublicar } from "@/components/game/types/game.types";

const useFeed = (
  perfile: Profile | undefined,
  lensConectado: Profile | undefined,
  openConnectModal: (() => void) | undefined,
  manejarLens: () => Promise<void>,
  conectado: boolean,
  setErrorInteraccion: (e: SetStateAction<boolean>) => void,
  setIndexar: (e: SetStateAction<Indexar>) => void,
  publicClient: PublicClient,
  address: `0x${string}` | undefined
) => {
  const elementoTexto = useRef(null);
  const [feedCargando, setFeedCargando] = useState<boolean>(false);
  const [feedActual, setFeedActual] = useState<
    (Post | Comment | Quote | Mirror)[]
  >([]);
  const [tieneMasFeed, setTieneMasFeed] = useState<boolean>(true);
  const [feedUbi, setFeedUbi] = useState<{
    abierto: string | undefined;
    etiquetas: string | undefined;
    mirrors: string | undefined;
  }>();
  const [masFeedCargando, setMasFeedCargando] = useState<boolean>(false);
  const [perfilesAbiertos, setPerfilesAbiertos] = useState<boolean[]>([]);
  const [mencionarPerfiles, setMencionarPerfiles] = useState<Profile[]>([]);
  const [caretCoord, setCaretCoord] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);
  const [comentariosAbiertos, setComentariosAbiertos] = useState<boolean[]>([]);
  const [abrirMirrorEleccion, setAbrirMirrorEleccion] = useState<boolean[]>([]);
  const [comentarPublicar, setComentarPublicar] = useState<ComentarPublicar[]>([
    {
      contenido: "",
      imagenes: [],
      videos: [],
      gifs: [],
    },
  ]);
  const [opcionAbierta, setOpcionAbierta] = useState<
    | {
        tipo: string;
        indice: number;
      }
    | undefined
  >();
  const [cargandoInteracciones, setCargandoInteracciones] = useState<
    {
      gusta: boolean;
      espejo: boolean;
      coleccion: boolean;
    }[]
  >([]);
  const [publicacionCargando, setPublicacionCargando] = useState<boolean[]>([]);

  const llamarFeed = async () => {
    setFeedCargando(true);
    try {
      const { data: datosUno } = await getPublications(
        {
          limit: LimitType.TwentyFive,
          where: {
            publicationTypes: [
              PublicationType.Post,
              PublicationType.Quote,
              PublicationType.Comment,
              PublicationType.Mirror,
            ],
            from: [perfile?.id],
            metadata: {
              publishedOn: ["npcStudio"],
            },
          },
        },
        lensConectado?.id
      );

      const { data: datosDos } = await getPublications(
        {
          limit: LimitType.TwentyFive,
          where: {
            publicationTypes: [
              PublicationType.Post,
              PublicationType.Quote,
              PublicationType.Comment,
            ],
            from: [perfile?.id],
            metadata: {
              publishedOn: ["npcStudio"],
            },
          },
        },
        lensConectado?.id
      );

      const { data: datosTres } = await getPublications(
        {
          limit: LimitType.TwentyFive,
          where: {
            publicationTypes: [PublicationType.Mirror],
            from: [perfile?.id],
          },
        },
        lensConectado?.id
      );

      setFeedActual(
        [
          ...(datosUno?.publications?.items || []),
          ...(datosDos?.publications?.items || []),
          ...(datosTres?.publications?.items || []),
        ]?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ) as (Post | Quote | Mirror)[]
      );
      setFeedUbi({
        abierto:
          datosDos?.publications?.items?.length !== 25
            ? undefined
            : datosDos?.publications?.pageInfo?.next,
        etiquetas:
          datosUno?.publications?.items?.length !== 25
            ? undefined
            : datosUno?.publications?.pageInfo?.next,
        mirrors:
          datosTres?.publications?.items?.length !== 25
            ? undefined
            : datosTres?.publications?.pageInfo?.next,
      });
      if (
        datosDos?.publications?.items &&
        datosDos?.publications?.items?.length !== 25 &&
        datosUno?.publications?.items &&
        datosUno?.publications?.items?.length !== 25 &&
        datosTres?.publications?.items &&
        datosTres?.publications?.items?.length !== 25
      ) {
        setTieneMasFeed(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setFeedCargando(false);
  };

  const llamarMasFeed = async () => {
    setMasFeedCargando(true);
    try {
      let datosUno, datosDos, datosTres;

      if (feedUbi?.etiquetas) {
        const { data } = await getPublications(
          {
            limit: LimitType.TwentyFive,
            cursor: feedUbi?.etiquetas,
            where: {
              publicationTypes: [
                PublicationType.Post,
                PublicationType.Mirror,
                PublicationType.Quote,
              ],
              from: [perfile?.id],
              metadata: {
                publishedOn: ["npcStudio"],
              },
            },
          },
          lensConectado?.id
        );
        datosUno = data;
      }

      if (feedUbi?.abierto) {
        const { data } = await getPublications(
          {
            cursor: feedUbi?.abierto,
            limit: LimitType.TwentyFive,
            where: {
              publicationTypes: [
                PublicationType.Post,
                PublicationType.Mirror,
                PublicationType.Quote,
              ],
              from: [perfile?.id],
              metadata: {
                publishedOn: ["npcStudio"],
              },
            },
          },
          lensConectado?.id
        );

        datosDos = data;
      }

      if (feedUbi?.mirrors) {
        const { data } = await getPublications(
          {
            limit: LimitType.TwentyFive,
            where: {
              publicationTypes: [PublicationType.Mirror],
              from: [perfile?.id],
            },
          },
          lensConectado?.id
        );

        datosTres = data;
      }

      setFeedActual(
        [
          ...feedActual,
          ...(datosUno?.publications?.items || []),
          ...(datosDos?.publications?.items || []),
          ...(datosTres?.publications?.items || []),
        ]?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ) as (Post | Quote | Mirror)[]
      );
      setFeedUbi({
        abierto:
          datosDos?.publications?.items?.length !== 25
            ? undefined
            : datosDos?.publications?.pageInfo?.next,
        etiquetas:
          datosUno?.publications?.items?.length !== 25
            ? undefined
            : datosUno?.publications?.pageInfo?.next,
        mirrors:
          datosTres?.publications?.items?.length !== 25
            ? undefined
            : datosTres?.publications?.pageInfo?.next,
      });
      if (
        datosDos?.publications?.items &&
        datosDos?.publications?.items?.length !== 25 &&
        datosUno?.publications?.items &&
        datosUno?.publications?.items?.length !== 25 &&
        datosTres?.publications?.items &&
        datosTres?.publications?.items?.length !== 25
      ) {
        setTieneMasFeed(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setMasFeedCargando(false);
  };

  useEffect(() => {
    if (perfile?.id) {
      llamarFeed();
    }
  }, [perfile]);

  const manejarMeGusta = async (
    id: string,
    hasReacted: boolean,
    indice: number
  ) => {
    if (!lensConectado?.id) {
      if (conectado) {
        await manejarLens();
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

  const manejarColeccionar = async (
    id: string,
    tipo: string,
    indice: number
  ) => {
    if (!lensConectado?.id) {
      if (conectado) {
        await manejarLens();
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
        await manejarLens();
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

  const manejarArchivo = (
    e: ChangeEvent<HTMLInputElement>,
    tipo: string,
    indice: number
  ): void => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        let objeto: Object = {};

        if (tipo == "video") {
          const nuevosVideos = [...(comentarPublicar?.[indice]?.videos || [])];
          nuevosVideos.push(e.target?.result as string);
          objeto = {
            videos: nuevosVideos,
          };
        } else {
          const nuevasImagenes = [
            ...(comentarPublicar?.[indice]?.imagenes || []),
          ];
          nuevasImagenes.push({
            tipo: "image/png",
            medios: e.target?.result as string,
          });
          objeto = {
            imagenes: nuevasImagenes,
          };
        }

        setComentarPublicar((prev) => {
          const arr = [...prev];
          arr[indice] = {
            ...arr[indice],
            ...objeto,
          };
          return arr;
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const manejarPublicar = async (indice: number, comentarioId?: string) => {
    if (!lensConectado?.id) {
      if (conectado) {
        await manejarLens();
      } else {
        openConnectModal && openConnectModal();
      }
      return;
    }

    if (
      !comentarPublicar[indice]?.contenido &&
      !comentarPublicar[indice]?.imagenes &&
      !comentarPublicar[indice]?.videos
    )
      return;
    setPublicacionCargando((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = true;
      return updatedArray;
    });
    try {
      const contentURI = await subirContenido(
        comentarPublicar[indice]?.contenido?.trim() == ""
          ? " "
          : comentarPublicar[indice]?.contenido,
        comentarPublicar[indice]?.imagenes || [],
        comentarPublicar[indice]?.videos || [],
        comentarPublicar[indice].gifs || []
      );

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await publicarLens(
        contentURI!,
        comentarPublicar[indice]?.coleccionar
          ? [
              {
                collectOpenAction: {
                  simpleCollectOpenAction:
                    comentarPublicar[indice]?.coleccionar,
                },
              },
            ]
          : undefined,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        setIndexar,
        setErrorInteraccion,
        () =>
          setPublicacionCargando((prev) => {
            const updatedArray = [...prev];
            updatedArray[indice] = false;
            return updatedArray;
          }),
        comentarioId
      );
      setComentarPublicar((prev) => {
        const arr = [...prev];
        arr[indice] = {
          contenido: "",
          imagenes: [],
          videos: [],
          gifs: [],
        };
        return arr;
      });
    } catch (err: any) {
      if (
        !err?.messages?.includes("Block at number") &&
        !err?.message?.includes("could not be found")
      ) {
        setErrorInteraccion(true);
        console.error(err.message);
      } else {
        setIndexar(Indexar.Exito);

        setTimeout(() => {
          setIndexar(Indexar.Inactivo);
        }, 3000);
      }
    }
    setPublicacionCargando((prev) => {
      const updatedArray = [...prev];
      updatedArray[indice] = false;
      return updatedArray;
    });
  };

  return {
    feedActual,
    llamarMasFeed,
    feedCargando,
    tieneMasFeed,
    setCaretCoord,
    caretCoord,
    comentariosAbiertos,
    setComentariosAbiertos,
    cargandoInteracciones,
    manejarMeGusta,
    manejarMirror,
    manejarArchivo,
    manejarColeccionar,
    setMencionarPerfiles,
    setPerfilesAbiertos,
    perfilesAbiertos,
    publicacionCargando,
    manejarPublicar,
    mencionarPerfiles,
    elementoTexto,
    setAbrirMirrorEleccion,
    abrirMirrorEleccion,
    setOpcionAbierta,
    comentarPublicar,
    setComentarPublicar,
  };
};

export default useFeed;
