import { npcClient } from "@/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const SPECTATOR_INFO = gql`
  query ($spectator: String!) {
    spectatorInfo(where: { spectator: $spectator }) {
      spectator
      auEarnedTotal
      weeklyPortion
      auClaimedTotal
      auUnclaimedTotal
      weekWeight
    }
  }
`;

export const getEspectadorInformacion = async (
  spectator: string
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = npcClient.query({
    query: SPECTATOR_INFO,
    variables: { spectator },
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
