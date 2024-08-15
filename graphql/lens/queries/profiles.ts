import { FetchResult } from "@apollo/client";
import {ProfilesDocument, ProfilesQuery, ProfilesRequest } from "../../generated";
import { apolloClient, authClient } from "@/lib/lens/client";

const getProfiles = async (
  request: ProfilesRequest,
  connected: boolean
): Promise<FetchResult<ProfilesQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: ProfilesDocument,
    variables: {
      request,
    },
    fetchPolicy: "no-cache",
  });
};

export default getProfiles;
