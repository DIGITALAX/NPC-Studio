import { autographClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const ARTICULO = gql`
  query ($buyer: String!) {
    orderCreateds(where: { buyer: $buyer }) {
      id
      subOrderTypes
      total
      orderId
      blockNumber
      blockTimestamp
      transactionHash
      buyer
      fulfillment
      amounts
      subTotals
      parentIds
      collectionIds
      currencies
      mintedTokens
    }
  }
`;

export const getPedidos = async (
  buyer: string
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: ARTICULO,
    variables: { buyer },
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
