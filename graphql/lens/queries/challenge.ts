import { FetchResult } from "@apollo/client";
import {
  ChallengeDocument,
  ChallengeQuery,
  ChallengeRequest,
} from "../../generated";
import { authClient } from "@/lib/lens/client";

export const generateChallenge = async (
  request: ChallengeRequest
): Promise<FetchResult<ChallengeQuery>> => {
  return await authClient.query({
    query: ChallengeDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default generateChallenge;
