import { autographClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const GALLERIES = gql(
  `query($designer: String!) {
    galleryCreateds(where: { designer: $designer }) {
      designer
      collectionIds
      collections {
        acceptedTokens
        amount
        npcs
        postIds
        collectionId
        mintedTokenIds
        price
        type
        metadata {
          description
          images
          instructions
          tags
          title
          tipo
        }
        uri
      }
      galleryId
      uri
      metadata {
        title
        image
      }
    }
  }`
);

export const getGalleries = async (
  designer: string
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: GALLERIES,
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
