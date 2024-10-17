import { npcClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const PUB_VOTES = gql`
  query ($profileId: Int!, $pubId: Int!) {
    pubVotes(where: { profileId: $profileId, pubId: $pubId }) {
      spectator
      profileId
      pubId
      blockNumber
      blockTimestamp
      transactionHash
      comment
      npc
      model
      chatContext
      prompt
      style
      personality
      tokenizer
      media
      global
    }
  }
`;

export const getPubVotes = async (
  profileId: number,
  pubId: number
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = npcClient.query({
    query: PUB_VOTES,
    variables: { profileId, pubId },
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
