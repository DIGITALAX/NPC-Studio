import { autographClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const COLECCION = gql`
  query ($collectionId: Int!) {
    collections(where: { collectionId: $collectionId }) {
      uri
      type
      price
      mintedTokenIds
      galleryId
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
