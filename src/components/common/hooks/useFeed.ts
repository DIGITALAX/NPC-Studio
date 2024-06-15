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

const useFeed = (lensConectado: Profile | undefined, escena: string) => {
  const [feedCargando, setFeedCargando] = useState<boolean>(false);
  const [feedActual, setFeedActual] = useState<
    (Post | Comment | Quote | Mirror)[]
  >([]);
  const [tieneMasFeed, setTieneMasFeed] = useState<boolean>(true);
  const [feedUbi, setFeedUbi] = useState<string>();
  const [masFeedCargando, setMasFeedCargando] = useState<boolean>(false);

  const llamarFeed = async () => {
    setFeedCargando(true);
    try {
      const { data } = await getPublications(
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

      setFeedActual(data?.publications?.items as (Post | Quote | Mirror)[]);
      setFeedUbi(data?.publications?.pageInfo?.next);
      if (
        data?.publications?.items &&
        data?.publications?.items?.length !== 25
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
      const { data } = await getPublications(
        {
          limit: LimitType.TwentyFive,
          cursor: feedUbi,
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

      setFeedActual([
        ...feedActual,
        ...(data?.publications?.items as (Post | Quote | Mirror)[]),
      ]);
      setFeedUbi(data?.publications?.pageInfo?.next);
      if (
        data?.publications?.items &&
        data?.publications?.items?.length !== 25
      ) {
        setTieneMasFeed(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setMasFeedCargando(false);
  };

  useEffect(() => {
    setTieneMasFeed(true);
    llamarFeed();
  }, [escena, lensConectado]);

  return {
    feedCargando,
    feedActual,
    tieneMasFeed,
    llamarMasFeed,
    masFeedCargando,
    setFeedActual
  };
};

export default useFeed;
