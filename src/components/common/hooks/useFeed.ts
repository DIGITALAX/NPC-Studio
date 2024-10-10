import { useEffect, useState } from "react";
import {
  Comment,
  LimitType,
  Mirror,
  Post,
  Profile,
  PublicationType,
  Quote,
} from "../../../../graphql/generated";
import getPublications from "../../../../graphql/lens/queries/publications";
import { AUTOGRAPH_OPEN_ACTION } from "@/lib/constants";

const useFeed = (
  lensConectado: Profile | undefined,
  escena: string,
  npcIds: string[]
) => {
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
            ],
            metadata: {
              publishedOn: ["npcStudio"],
              tags: {
                all: ["npcStudio", escena],
              },
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
            metadata: {
              publishedOn: ["npcStudio"],
            },
            withOpenActions: [
              {
                address: AUTOGRAPH_OPEN_ACTION,
              },
            ],
          },
        },
        lensConectado?.id
      );

      const { data: datosTres } = await getPublications(
        {
          limit: LimitType.TwentyFive,
          where: {
            publicationTypes: [PublicationType.Mirror],
            from: npcIds,
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
              metadata: {
                publishedOn: ["npcStudio"],
                tags: {
                  all: ["npcStudio", escena],
                },
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
              metadata: {
                publishedOn: ["npcStudio"],
              },
              withOpenActions: [
                {
                  address: AUTOGRAPH_OPEN_ACTION,
                },
              ],
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
              from: npcIds,
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
    if (escena && npcIds?.length > 0 && feedActual.length < 1) {
      llamarFeed();
    }
  }, [npcIds?.length, escena]);

  useEffect(() => {
    if (
      escena &&
      npcIds?.length > 0 &&
      escena !== localStorage?.getItem("escena")
    ) {
      setTieneMasFeed(true);
      localStorage.setItem("escena", escena);
      llamarFeed();
    }
  }, [escena, lensConectado, npcIds]);

  return {
    feedCargando,
    feedActual,
    tieneMasFeed,
    llamarMasFeed,
    masFeedCargando,
    setFeedActual,
  };
};

export default useFeed;
