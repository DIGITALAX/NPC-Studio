import { FetchResult } from "@apollo/client";
import {
  PublicationDocument,
  PublicationQuery,
  PublicationRequest,
} from "../../generated";
import { apolloClient, authClient } from "@/lib/lens/client";

export const getPublication = async (
  request: PublicationRequest,
  connected: boolean
): Promise<FetchResult<PublicationQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: PublicationDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default getPublication;
