import { autographClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const NPC_RENT_ALL = gql`
  query {
    rentPaidNPCs {
      npc
      amount
      transactionHash
      blockTimestamp
    }
  }
`;


export const getNPCRentTodo = async (): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: NPC_RENT_ALL,
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
