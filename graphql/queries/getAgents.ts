import { autographClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const AGENTS = gql`
  query {
    agentCollections_collection {
      npc
      collections {
        collectionId
        price
        type
        designer
        uri
        metadata {
          images
          title
        }
      }
    }
  }
`;

export const getAgents = async (): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: AGENTS,
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
