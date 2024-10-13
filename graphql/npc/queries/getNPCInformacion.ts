import { autographClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const NPC_INFO = gql`
  query ($npc: String!) {
    nPCInfo(where: { npc: $npc }) {
      npc
      auEarnedTotal
      auPaidTotal
      activeJobs
      currentWeeklyScore
      currentGlobalScore
      activeWeeks
      rentMissedTotal
    }
  }
`;

const NPC_INFO_ALL = gql`
  query ($npc: String!) {
    nPCInfos {
      npc
      auEarnedTotal
      auPaidTotal
      activeJobs
      currentWeeklyScore
      currentGlobalScore
      rentMissedTotal
      activeWeeks
    }
  }
`;

export const getNPCInformacion = async (
  npc: string
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: NPC_INFO,
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

export const getNPCInformacionTodo = async (): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: NPC_INFO_ALL,
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
