import { FetchResult } from "@apollo/client";
import {
  ProfileSearchRequest,
  SearchProfilesQuery,
  SearchProfilesDocument,
} from "../../generated";
import { apolloClient, authClient } from "@/lib/lens/client";

export const searchProfiles = async (
  request: ProfileSearchRequest,
  connected: boolean
): Promise<FetchResult<SearchProfilesQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: SearchProfilesDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default searchProfiles;
