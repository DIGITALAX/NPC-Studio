import { FetchResult } from "@apollo/client";
import { WhoReactedPublicationDocument, WhoReactedPublicationQuery, WhoReactedPublicationRequest } from "../../generated";
import { apolloClient, authClient } from "@/lib/lens/client";


export const whoReactedPublication = async (
  request: WhoReactedPublicationRequest,
  connected: boolean
): Promise<FetchResult<WhoReactedPublicationQuery>> => {
  return await (connected ? apolloClient : authClient).query({
    query: WhoReactedPublicationDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};
export default whoReactedPublication;
