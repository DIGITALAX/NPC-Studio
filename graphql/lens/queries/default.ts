import { FetchResult } from "@apollo/client";
import {
  DefaultProfileDocument,
  DefaultProfileRequest,
  DefaultProfileQuery,
} from "../../generated";
import { apolloClient, authClient } from "@/lib/lens/client";

const getDefaultProfile = async (
  request: DefaultProfileRequest,
  connected: boolean
): Promise<FetchResult<DefaultProfileQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: DefaultProfileDocument,
    variables: {
      request,
    },
    fetchPolicy: "no-cache",
  });
};

export default getDefaultProfile;
