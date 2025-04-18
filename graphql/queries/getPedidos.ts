import { autographClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const ARTICULO = gql`
  query ($buyer: String!, $account: String!) {
    orderCreateds(
      where: { or: [{ buyer: $buyer }, { buyer: $account }] }
      orderBy: orderId
      orderDirection: desc
    ) {
      subOrders {
        mintedTokenIds
        fulfiller
        designer
        currency
        fulfillerAmount
        designerAmount
        total
        collectionId
        amount
        autographType
        collection {
          type
          price
          uri
          mintedTokenIds
          metadata {
            images
          }
          collectionId
          amount
        }
        catalog {
          amount
          price
          minted
          pages
        }
      }
      total
      orderId
      blockNumber
      blockTimestamp
      transactionHash
      buyer
      fulfillment
    }
  }
`;

export const getPedidos = async (
  buyer: string,
  account: string
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: ARTICULO,
    variables: { buyer, account },
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
