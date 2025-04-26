import { spectatorClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const AGENTS = gql`
  query ($address: String) {
    agents(where: { address: $address }) {
      id
      address
      au
      auTotal
      cycleSpectators
      activity {
        id
        data
        spectator
        blockTimestamp
        spectateMetadata {
          comment
          model
          scene
          chatContext
          appearance
          collections
          personality
          training
          tokenizer
          lora
          spriteSheet
          global
        }
      }
    }
  }
`;

export const getAgentScore = async (
  address: string
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = spectatorClient.query({
    query: AGENTS,
    variables: { address },
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
