import { autographClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const COLECCION = gql`
  query ($collectionId: Int!) {
    collections(where: { collectionId: $collectionId }) {
      uri
      type
      price
      mintedTokens
      galleryId
      id
      designer
      collectionMetadata {
        title
        tipo
        tags
        npcs
        instructions
        locales
        image
        id
        gallery
        description
      }
      collectionId
      amount
      acceptedTokens
      profileIds
      pubIds
    }
  }
`;

export const getColeccion = async (
  collectionId: number
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: COLECCION,
    variables: { collectionId },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve({ timedOut: true });
    }, 60000);
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);

  timeoutId && clearTimeout(timeoutId);

  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};

const COLECCION_PUBLICACION = gql`
  query ($profileIds: [String], $pubIds: [String]) {
    collections(where: { profileIds: $profileIds, pubIds: $pubIds }) {
      uri
      type
      price
      mintedTokens
      galleryId
      id
      designer
      collectionMetadata {
        title
        tipo
        tags
        npcs
        instructions
        locales
        image
        id
        gallery
        description
      }
      collectionId
      amount
      acceptedTokens
      profileIds
      pubIds
    }
  }
`;

export const getColeccionPublicacion = async (
  profileIds: string[],
  pubIds: string[]
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: COLECCION_PUBLICACION,
    variables: { profileIds, pubIds },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve({ timedOut: true });
    }, 60000);
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);

  timeoutId && clearTimeout(timeoutId);

  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};
