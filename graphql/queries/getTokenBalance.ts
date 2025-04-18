import { autographClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const TOKENS = gql`
  query {
    eRC20Addeds {
      token
      threshold
    }
    eRC721Addeds {
      token
      threshold
    }
  }
`;

export const getTokenBalance = async (): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = autographClient.query({
    query: TOKENS,
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
