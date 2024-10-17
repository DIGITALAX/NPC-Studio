import { npcClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const PUB_VOTES = gql`
  query ($npc: String!) {
    npcvotes(where: { npc: $npc }) {
      spectator
      npc
      blockNumber
      blockTimestamp
      transactionHash
      comment
      model
      chatContext
      personality
      tokenizer
      scene
      appearance
      completedJobs
      training
      lora
      spriteSheet
      global
    }
  }
`;

export const getNPCVotes = async (npc: string): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = npcClient.query({
    query: PUB_VOTES,
    variables: { npc },
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
