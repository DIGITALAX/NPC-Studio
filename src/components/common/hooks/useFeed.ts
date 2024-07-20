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

const useFeed = (lensConectado: Profile | undefined, escena: string) => {
  const [feedCargando, setFeedCargando] = useState<boolean>(false);
  const [feedActual, setFeedActual] = useState<
    (Post | Comment | Quote | Mirror)[]
  >([]);
  const [tieneMasFeed, setTieneMasFeed] = useState<boolean>(true);
  const [feedUbi, setFeedUbi] = useState<{
    abierto: string | undefined;
    etiquetas: string | undefined;
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

      const { data: datosDos } = await getPublications(
        {
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

      setFeedActual(
        [
          ...(datosUno?.publications?.items || []),
          ...(datosDos?.publications?.items || []),
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
      });
      if (
        datosDos?.publications?.items &&
        datosDos?.publications?.items?.length !== 25 &&
        datosUno?.publications?.items &&
        datosUno?.publications?.items?.length
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
      let datosUno, datosDos;

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

      setFeedActual(
        [
          ...feedActual,
          ...(datosUno?.publications?.items || []),
          ...(datosDos?.publications?.items || []),
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
      });
      if (
        datosDos?.publications?.items &&
        datosDos?.publications?.items?.length !== 25 &&
        datosUno?.publications?.items &&
        datosUno?.publications?.items?.length
      ) {
        setTieneMasFeed(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setMasFeedCargando(false);
  };

  useEffect(() => {
    if (escena) {
      setTieneMasFeed(true);
      llamarFeed();
    }

  }, [escena, lensConectado]);

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
