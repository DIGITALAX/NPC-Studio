import { autographClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const CATALOGO = gql(
  `query {
   autographCreateds(first: 1) {
    id
    uri
    amount
    price
    minted
    pageCount
    postId
    designer
    acceptedTokens
    pages
    transactionHash
    blockTimestamp
    blockNumber
  }
  }`
);

export const getCatalogo = async (): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: CATALOGO,
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

const CATALOGO_PUBLICACION = gql(
  `query($postId: Int) {
   autographCreateds(first: 1, where: {postId: $postId}) {
    id
    uri
    amount
    price
    mintedTokenIds
    pageCount
    postId
    designer
    acceptedTokens
    pages
    transactionHash
    blockTimestamp
    blockNumber
  }
  }`
);

export const getCatalogoPublicacion = async (
  postId: number
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: CATALOGO_PUBLICACION,
    fetchPolicy: "no-cache",
    variables: {
      postId,
    },
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
