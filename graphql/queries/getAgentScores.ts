import { autographClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const AGENTS = gql`
  query {
    agentScores_collection {
      npc
      auEarnedTotal
      auEarnedCurrent
      scores {
        scorer
        blockTimestamp
        blockNumber
        transactionHash
        npc
        metadata {
          comment
          model
          scene
          chatContext
          appearance
          personality
          training
          lora
          collections
          spriteSheet
          tokenizer
          global
        }
      }
    }
  }
`;

export const getAgentScores = async (): Promise<FetchResult | void> => {
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
