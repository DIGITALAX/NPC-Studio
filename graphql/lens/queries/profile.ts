import { FetchResult } from "@apollo/client";
import { ProfileDocument, ProfileQuery, ProfileRequest } from "../../generated";
import { apolloClient, authClient } from "@/lib/lens/client";

const getProfile = async (
  request: ProfileRequest,
  connected: boolean
): Promise<FetchResult<ProfileQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: ProfileDocument,
    variables: {
      request,
    },
    fetchPolicy: "no-cache",
  });
};

export default getProfile;
