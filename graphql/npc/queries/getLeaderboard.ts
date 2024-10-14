import { autographClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const NPC_LEADER = gql`
  query {
    leaderboardNPCs {
      npc
      totalScore
      weeklyScore
      totalAU
    }
  }
`;

const SPECTATOR_LEADER = gql`
  query {
    leaderboardSpectators {
      spectator
      totalScore
      weeklyScore
      totalAU
    }
  }
`;

export const getLeaderboardNPC = async (): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: NPC_LEADER,
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

export const getLeaderboardSpectator =
  async (): Promise<FetchResult | void> => {
    let timeoutId: NodeJS.Timeout | undefined;
    const queryPromise = autographClient.query({
      query: SPECTATOR_LEADER,
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
