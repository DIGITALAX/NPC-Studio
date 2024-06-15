import { FetchResult } from "@apollo/client";
import {
  BroadcastOnchainDocument,
  BroadcastOnchainMutation,
  BroadcastRequest,
} from "../../generated";
import { apolloClient } from "@/lib/lens/client";

const broadcast = async (
  request: BroadcastRequest
): Promise<FetchResult<BroadcastOnchainMutation>> => {
  return await apolloClient.mutate({
    mutation: BroadcastOnchainDocument,
    variables: {
      request,
    },
  });
};

export default broadcast;
