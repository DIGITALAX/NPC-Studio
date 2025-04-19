import { autographClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const ARTICULO = gql`
  query ($designer: String!, $type: Int!) {
    collections(where: { designer_contains: $designer, type: $type }) {
      uri
      type
      price
      mintedTokenIds
      galleryId
      id
      npcs
      designer
      metadata {
        title
        tags
        images
        description
      }
      collectionId
      amount
      acceptedTokens
      postIds
    }
  }
`;

const ARTICULO_ALL = gql`
  query ($designer: String!) {
    collections(
      where: {
        and: [
          { designer_contains: $designer }
          { or: [{ type: 1 }, { type: 2 }] }
        ]
      }
    ) {
      uri
      type
      price
      mintedTokenIds
      galleryId
      id
      npcs
      designer
      metadata {
        title
        tags
        images
        description
      }
      collectionId
      amount
      acceptedTokens
      postIds
    }
  }
`;

export const getArticulo = async (
  designer: string,
  type: number
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: ARTICULO,
    variables: { designer, type },
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

export const getAll = async (designer: string): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: ARTICULO_ALL,
    variables: { designer },
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
