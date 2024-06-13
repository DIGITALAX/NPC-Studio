import { autographClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const GALLERIES = gql(
  `query($designer: String!) {
    galleryCreateds(where: { designer: $designer }) {
      designer
      collectionIds
      collections {
        acceptedTokens
        amount
        collectionId
        mintedTokens
        price
        type
        collectionMetadata {
          description
          gallery
          image
          instructions
          locales
          tags
          npcs
          title
          tipo
        }
        uri
      }
      galleryId
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
