import { autographClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const MIX = gql`
  query {
    collections(where: { mix: true, type_not: 3 }) {
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

export const getMezcla = async (): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: MIX,
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
