import { autographClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const ARTICULO = gql`
  query ($designer: String!, $type: Int!) {
    collections(where: { designer_contains: $designer, type: $type }) {
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
